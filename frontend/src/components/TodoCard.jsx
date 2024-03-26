import React, { useState } from "react";
import EditModal from "./EditModal";
import CompleteButton from "./CompleteButton";

const TodoCard = ({ todo, setTodoDeleted }) => {
  const [isOn, setOn] = useState(todo?.isComplete);
  const [isEditModalOpen, setEditModalOpen] = useState(false);


  return (
    <>
        <EditModal
          setModalOpen={setEditModalOpen}
          isModalOpen={isEditModalOpen}
          todo={todo}
          setTodoDeleted={setTodoDeleted}
        />
      <div
        className={` bg-[#ffffff78] backdrop-blur-lg shadow-2xl shadow-themeShadow rounded-3xl px-5 divide-y-2 divide-[#00000034]`}
      >
        {/* title  */}

        <div className="py-5 font-semibold text-xl flex justify-between items-center">
          {/* titile  */}
          <p
            onClick={() => {
              setEditModalOpen(true) 
            }}
            className={`${
              isOn ? "line-through opacity-50" : ""
            } transition-all`}
          >
            {todo.title}
          </p>

          {/* button  */}

          <CompleteButton todo={todo} isOn={isOn} setOn={setOn} />

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
