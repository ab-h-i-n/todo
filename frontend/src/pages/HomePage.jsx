import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../UserContex";
import TodosContainer from "../components/TodosContainer";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";
import SignOutButton from "../components/SignOutButton";

const HomePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isAddModalOpen,setAddModalOpen] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const fetchUser = async () => {
    try {
      const userId = secureLocalStorage.getItem("user");

      const responce = await fetch(`${serverUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userId,
      });

      const { data, error } = await responce.json();

      if(error){
        console.error(error);
      }else{
        setUserData(data);
      }
      
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    fetchUser();  // eslint-disable-next-line
  },[])

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div className="mx-5 mb-20">
        <Header />
        <SignOutButton/>
        <TodosContainer />
      </div>

      <AddModal setModalOpen={setAddModalOpen} isModalOpen={isAddModalOpen}  />

      <AddButton setModalOpen={setAddModalOpen} />
    </div>
  );
};

export default HomePage;
