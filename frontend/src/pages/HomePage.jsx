import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../UserContex";
import TodosContainer from "../components/TodosContainer";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";

const HomePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isAddModalOpen,setAddModalOpen] = useState(false);


  const fetchUser = async () => {
    try {
      const userId = secureLocalStorage.getItem("user");

      const responce = await fetch("https://ab-h-i-n-todo-server.vercel.app/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userId,
      });

      const { data, error } = await responce.json();

      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(()=>{
    fetchUser();
  },[isAddModalOpen])

  return (
    <div className="min-h-screen ">
      <div className="mx-5 mb-20">
        <Header />

        <TodosContainer />
      </div>

      <AddModal setModalOpen={setAddModalOpen} isModalOpen={isAddModalOpen}  />

      <AddButton setModalOpen={setAddModalOpen} />
    </div>
  );
};

export default HomePage;
