import React, { useContext } from "react";
import TodoCard from "../components/TodoCard";
import { UserContext } from "../UserContex";

const TodosContainer = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className="mt-8 mb-40 min-h-screen flex flex-col gap-y-5">
      {userData?.todos?.length > 0 ? (
        userData?.todos
          .slice()
          .reverse()
          .map((todo, index) => <TodoCard key={"todo_" + index} todo={todo} />)
      ) : (
        <h1>No todo </h1>
      )}
    </div>
  );
};

export default TodosContainer;
