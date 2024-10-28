// import React from "react";
import PropTypes from "prop-types";

const TodoItem = ({ todo }) => {
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p>Status: {todo.is_completed ? "Completed" : "Not Completed"}</p>
      {/* knapp för att redigera eller ta bort */}
    </div>
  );
};

// PropTypes för att validera props som skickas till komponenten
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    is_completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
