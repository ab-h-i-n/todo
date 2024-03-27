import React, { useContext, useRef, useState } from "react";
import SubmitButton from "./SubmitButton";
import { Label, TextInput } from "flowbite-react";
import secureLocalStorage from "react-secure-storage";
import DeleteButton from "./DeleteButton";
import { UserContext } from "../UserContex";


const EditModal = ({ setModalOpen, isModalOpen, todo , setTodoDeleted  }) => {
  const titleRef = useRef();
  const msgRef = useRef();
  const userId = secureLocalStorage.getItem("user");
  const [isLoading,setLoading] = useState(false);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { setUserData } = useContext(UserContext);

  const handleFormClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isLoading){
      return;
    }

    const newTodo = {
      _id: JSON.parse(userId)._id,
      todo_id : todo._id,
      title: titleRef.current.value,
      msg: msgRef.current.value,
    };

    setLoading(true);
    try {

      const response = await fetch(`${serverUrl}/edittodo`,{
        method : 'PUT',
        headers : {
          
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newTodo)
      });

      const {data ,error} = await response.json();

      if(error){
        console.error(error);
      }else{
        setUserData(data);
      }
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <div
      onClick={() => setModalOpen(false)}
      className={`fixed z-[100] top-0 left-0 w-screen h-screen transition-all ${
        isModalOpen
          ? "backdrop-blur-md pointer-events-auto"
          : "backdrop-blur-none pointer-events-none"
      } `}
    >
      <form
        onClick={handleFormClick}
        onSubmit={handleSubmit}
        className={` transition-all ${
          isModalOpen
            ? "pointer-events-auto translate-y-[-50%]"
            : "pointer-events-none translate-y-[100vh] "
        } relative overflow-hidden top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] grid w-full max-w-[350px] gap-6 bg-[#ffffffb4] backdrop-blur-3xl px-10 py-20 lg:py-20 lg:px-12 rounded-3xl shadow-2xl shadow-themeShadow`}
      >
        <DeleteButton setModalOpen={setModalOpen} todo={todo} setTodoDeleted={setTodoDeleted}  />
        <div>
          <div className="mb-1 block">
            <Label htmlFor="title" value="Title" className="lg:text-lg" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="Example"
            ref={titleRef}
            defaultValue={todo.title}
            required
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label
              htmlFor="Description"
              value="Description"
              className="lg:text-lg"
            />
          </div>
          <TextInput
            id="desc"
            type="text"
            placeholder="What to do...?"
            ref={msgRef}
            defaultValue={todo.msg}
            required
          />
        </div>
        <SubmitButton text={"Edit"} isLoading={isLoading} />
      </form>
    </div>
  );
};

export default EditModal;
