import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const TodoForm = ({ existingTodo, onSave }) => {
  const [title, setTitle] = useState(existingTodo ? existingTodo.title : "");
  const [description, setDescription] = useState(
    existingTodo ? existingTodo.description : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { title, description };
    if (existingTodo) {
      axios
        .put(`/api/todos/${existingTodo.id}`, newTodo)
        .then((response) => onSave(response.data))
        .catch((error) => console.error("Error updating todo:", error));
    } else {
      axios
        .post("/api/todos", newTodo)
        .then((response) => onSave(response.data))
        .catch((error) => console.error("Error creating todo:", error));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Save</button>
    </form>
  );
};

TodoForm.propTypes = {
  existingTodo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default TodoForm;
