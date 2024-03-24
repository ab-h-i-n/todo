import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";

const TodoCard = ({ todo }) => {
  const [isOn, setOn] = useState(todo?.isComplete);
  var userId = secureLocalStorage.getItem("user");
  const uid = JSON.parse(userId)._id
  

  const changeComplete = async() => {
    try {
      const responce = await fetch("http://localhost:3001/setcomplete", {
        method: "PUT",
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          _id: uid,
          todo_id: todo._id,
        }),
      });

      const { data, error } = await responce.json();

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-[#ffffff78] backdrop-blur-lg shadow-2xl shadow-themeShadow rounded-3xl px-5 divide-y-2 divide-[#00000034]">
        {/* title  */}

        <div className="py-5 font-semibold text-xl flex justify-between items-center">
          {/* titile  */}
          <p
            className={`${
              isOn ? "line-through opacity-50" : ""
            } transition-all`}
          >
            {todo.title}
          </p>

          {/* button  */}

          <div
            onClick={() => {
              setOn(!isOn);
              changeComplete();
            }}
            className="cursor-pointer h-[40px] w-[80px] relative rounded-full overflow-hidden flex items-center shadow-lg shadow-[#2d2d2d5d]"
          >
            {/* inner */}
            <div
              className={`${
                isOn ? "bg-green-400" : "bg-[#8d8d8d]"
              } transition-all h-full w-full rounded-full shadow-inner  shadow-[#2d2d2d5d]`}
            ></div>
            {/* circle  */}
            <div
              className={`${
                isOn ? "translate-x-8" : "translate-x-0"
              } transition-all absolute mx-2 z-10 bg-white h-[30px] w-[30px] rounded-full shadow-lg shadow-[#2d2d2d5d]`}
            ></div>
          </div>
        </div>

        {/* message  */}

        <div className={`${isOn ? "line-through opacity-50" : ""} py-5`}>
          {todo.msg}
        </div>
      </div>
    </>
  );
};

export default TodoCard;
