import React, { useContext } from "react";
import { UserContext } from "../UserContex";
import secureLocalStorage from "react-secure-storage";


const CompleteButton = ({ todo,isOn,setOn }) => {
  var userId = secureLocalStorage.getItem("user");
  const uid = JSON.parse(userId)._id;

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { setUserData } = useContext(UserContext);

  const changeComplete = async () => {
    try {
      const responce = await fetch(`${serverUrl}/setcomplete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: uid,
          todo_id: todo._id,
        }),
      });

      const { data, error } = await responce.json();

      if (error) {
        console.error(error);
      } else {
        setUserData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};

export default CompleteButton;
