import React, { useContext } from "react";
import TodoCard from "../components/TodoCard";
import { UserContext } from "../UserContex";

const TodosContainer = ({ isTodoDeleted, setTodoDeleted }) => {
  const { userData } = useContext(UserContext);

  return (
    <div className="mt-8 mb-40 min-h-[62vh] flex flex-col gap-y-5 lg:mx-80">
      {userData?.todos?.length > 0 ? (
        userData?.todos
          .slice()
          .reverse()
          .map((todo) => (
            <TodoCard
              key={"todo_" + todo._id}
              todo={todo}
              isTodoDeleted={isTodoDeleted}
              setTodoDeleted={setTodoDeleted}
            />
          ))
      ) : (
        <div className="flex items-center justify-center text-6xl text-[#567cdb] font-black h-[63vh]">
          <span >No todos</span>
        </div>
      )}
    </div>
  );
};

export default TodosContainer;
