import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../UserContex";
import TodosContainer from "../components/TodosContainer";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";
import SignOutButton from "../components/SignOutButton";

const HomePage = () => {
  // eslint-disable-next-line
  const { userData, setUserData } = useContext(UserContext);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

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

      if (error) {
        console.error(error);
      } else {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {isLoading ? (
        <div className="flex h-screen justify-center items-center text-4xl text-themeBlue overflow-hidden">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div className="mx-5 mb-20">
            <Header />
            <SignOutButton />
            <TodosContainer />
          </div>

          <AddModal
            setModalOpen={setAddModalOpen}
            isModalOpen={isAddModalOpen}
          />

          <AddButton setModalOpen={setAddModalOpen} />
        </>
      )}
    </div>
  );
};

export default HomePage;
