// import React from "react";
import PropTypes from "prop-types";
import { Todo, TodoItemProps } from "../../src/types";

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p>Status: {todo.is_completed ? "Completed" : "Not Completed"}</p>
      {/* knapp för att redigera eller ta bort */}
    </div>
  );
};

export default TodoItem;
