import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import { Todo } from "../types";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get<Todo[]>("/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos", error));
  }, []);

  return (
    <div>
      <h1>ToDo List</h1>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
export default TodoList;
