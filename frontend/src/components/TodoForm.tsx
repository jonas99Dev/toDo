import React, { useState } from "react";
import axios from "axios";
// import PropTypes from "prop-types";
import { Todo, NewTodo, TodoFormProps } from "../types";

const TodoForm: React.FC<TodoFormProps> = ({ existingTodo, onSave }) => {
  const [title, setTitle] = useState<string>(
    existingTodo ? existingTodo.title : ""
  );
  const [description, setDescription] = useState<string>(
    existingTodo?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = { title, description };
    if (existingTodo) {
      axios
        .put<Todo>(`/api/todos/${existingTodo.id}`, newTodo)
        .then((response) => onSave(response.data))
        .catch((error) => console.error("Error updating todo:", error));
    } else {
      axios
        .post<Todo>("/api/todos", newTodo)
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

export default TodoForm;

// kod som tidigare använts

// TodoForm.propTypes = {
//   existingTodo: PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//   }),
//   onSave: PropTypes.func.isRequired,
// };
