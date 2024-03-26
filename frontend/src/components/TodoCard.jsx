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
              setEditModalOpen(true);
            }}
            className={`${
              isOn ? "line-through opacity-50" : ""
            } transition-all flex items-center gap-3`}
          >
            <span>{todo.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-themeShadow"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
          </p>

          {/* button  */}

          <CompleteButton todo={todo} isOn={isOn} setOn={setOn} />
        </div>

        {/* message  */}

        <div className={`${isOn ? "line-through opacity-50" : ""} py-5`}>
          {todo.msg}
        </div>

        {/* time stamp  */}
        <div>{todo.timestamp}</div>
      </div>
    </>
  );
};

export default TodoCard;
