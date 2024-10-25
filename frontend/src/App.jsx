import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, List, ListItem, ListItemText } from "@mui/material";

function App() {
  const [todos, setTodos] = useState([]);

  // Hämta todos från backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get(`http://localhost:3000/api/todos`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Funktion för att hantera ändring av status för en todo
  const handleCheckboxChange = (todo) => {
    axios
      .put(`http://localhost:3000/api/todos/${todo.id}`, {
        ...todo,
        is_completed: !todo.is_completed,
      })
      .then(() => {
        // Uppdatera todo-listan efter en lyckad uppdatering
        fetchTodos();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontFamily: "Georgia, serif" }}>
        ToDo List
      </h1>
      <div
        style={{
          backgroundColor: "#fefefe",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ddd",
        }}
      >
        <List style={{ padding: 0 }}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px dashed #ccc",
                padding: "10px 0",
              }}
            >
              <Checkbox
                checked={todo.is_completed}
                onChange={() => handleCheckboxChange(todo)}
                color="primary"
                style={{ marginRight: "10px" }}
              />
              <ListItemText
                primary={todo.title}
                secondary={todo.description}
                primaryTypographyProps={{
                  style: {
                    fontFamily: "Courier, monospace",
                    textDecoration: todo.is_completed ? "line-through" : "none",
                    color: todo.is_completed ? "#888" : "#333",
                  },
                }}
                secondaryTypographyProps={{
                  style: { fontFamily: "Arial, sans-serif", fontSize: "14px" },
                }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;
