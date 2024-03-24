import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../UserContex";
import TodosContainer from "../components/TodosContainer";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";

const HomePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isModalOpen,setModalOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const userId = secureLocalStorage.getItem("user");

      const responce = await fetch("http://localhost:3001/user", {
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

  return (
    <div className="min-h-screen ">
      <div className="mx-5 mb-20">
        <Header />

        <TodosContainer />
      </div>

      <AddModal setModalOpen={setModalOpen} isModalOpen={isModalOpen} />

      <AddButton setModalOpen={setModalOpen} />
    </div>
  );
};

export default HomePage;
