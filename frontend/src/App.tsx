import { useEffect, useState } from "react";
import axios from "axios";
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Container,
  Alert,
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";
import { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({
    title: "",
    description: "",
  });
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Ny state-variabel för framgångsmeddelanden
  const sortedTodos: Todo[] = [...todos].sort((a, b) => a.id - b.id);
  const API_URL = "https://todo-cd4b.onrender.com/api";

  // Hämta todos från backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    axios
      .get<Todo[]>(`${API_URL}/todos`)
      .then((response) => {
        setTodos(response.data);
        setErrorMessage(null); // Rensa eventuella fel när hämtning lyckas
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch todos. Please try again.");
        console.error("Error fetching data:", error);
      });
  };

  // Lägg till en ny todo
  const handleAddTodo = (): void => {
    if (!newTodo.title) return; // Kolla att titel inte är tom

    axios;
    axios
      .post<Todo>(`${API_URL}/todos`, newTodo)
      .then(() => {
        setNewTodo({ title: "", description: "" });
        fetchTodos();
        setSuccessMessage("Todo added successfully!"); // Visa framgångsmeddelande
        setTimeout(() => setSuccessMessage(null), 3000); // Rensa efter 3 sekunder
      })
      .catch((error) => {
        setErrorMessage("Failed to add a new todo. Please try again.");
        console.error("Error adding todo:", error);
      });
  };

  // Ta bort en todo
  const handleDeleteTodo = (id: number): void => {
    axios;
    axios
      .delete(`${API_URL}/todos/${id}`)
      .then(() => {
        fetchTodos();
        setSuccessMessage("Todo deleted successfully!"); // Visa framgångsmeddelande
        setTimeout(() => setSuccessMessage(null), 3000); // Rensa efter 3 sekunder
      })
      .catch((error) => {
        setErrorMessage("Failed to delete the todo. Please try again.");
        console.error("Error deleting todo:", error);
      });
  };

  // Börja redigera en todo
  const handleEditTodo = (todo: Todo): void => {
    setEditingTodo({ ...todo });
  };

  // Spara en redigerad todo
  const handleSaveTodo = () => {
    if (!editingTodo) return;

    axios
      .put<Todo>(`${API_URL}/todos/${editingTodo.id}`, editingTodo)

      .then(() => {
        setEditingTodo(null);
        fetchTodos();
        setSuccessMessage("Todo updated successfully!"); // Visa framgångsmeddelande
        setTimeout(() => setSuccessMessage(null), 3000); // Rensa efter 3 sekunder
      })
      .catch((error) => {
        setErrorMessage("Failed to update the todo. Please try again.");
        console.error("Error updating todo:", error);
      });
  };

  // Avbryt redigering av en todo
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // Funktion för att hantera ändring av status för en todo
  const handleCheckboxChange = (todo: Todo): void => {
    const updatedTodo = { ...todo, is_completed: !todo.is_completed };
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
    );
    axios
      .put(`${API_URL}/todos/${todo.id}`, {
        ...todo,
        is_completed: !todo.is_completed,
      })
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        setErrorMessage("Failed to update the todo status. Please try again.");
        console.error("Error updating todo:", error);
      });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <h1 style={{ textAlign: "center", fontFamily: "Georgia, serif" }}>
        ToDo List
      </h1>

      {/* Visa felmeddelande om det finns ett */}
      {errorMessage && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          {errorMessage}
        </Alert>
      )}

      {/* Visa framgångsmeddelande om det finns ett */}
      {successMessage && (
        <Alert severity="success" style={{ marginBottom: "20px" }}>
          {successMessage}
        </Alert>
      )}

      {/* Formulär för att lägga till ny uppgift */}
      <div
        style={{
          marginBottom: "20px",
          backgroundColor: "#333",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #555",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
          display: "flex", // Flexbox för att justera vertikal centrering
          alignItems: "center", // Vertikal centrering
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          style={{
            marginRight: "10px",
            backgroundColor: "#444",
            color: "#fff",
            borderRadius: "4px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.5)",
          }}
          InputLabelProps={{ style: { color: "#bbb" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          style={{
            backgroundColor: "#444",
            color: "#fff",
            borderRadius: "4px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.5)",
            marginRight: "10px",
          }}
          InputLabelProps={{ style: { color: "#bbb" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            height: "56px", // Samma höjd som TextField
          }}
        >
          Add
        </Button>
      </div>

      {/* Lista över uppgifter */}
      <List>
        {sortedTodos.map((todo) => (
          <ListItem
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #ddd", // Ljus grå kantlinje
              padding: "10px",
              backgroundColor:
                editingTodo && editingTodo.id === todo.id ? "#f9f9f9" : "#fff", // Ljus bakgrund
              borderRadius: "8px", // Rundade hörn
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Ljus skugga för djup
              marginBottom: "10px", // Lägger till mellanrum mellan varje uppgift
            }}
          >
            <Checkbox
              checked={todo.is_completed}
              onChange={() => handleCheckboxChange(todo)}
              color="primary"
              style={{ marginRight: "10px" }}
            />
            {editingTodo && editingTodo.id === todo.id ? (
              <>
                <TextField
                  variant="outlined"
                  value={editingTodo.title}
                  onChange={(e) =>
                    setEditingTodo({ ...editingTodo, title: e.target.value })
                  }
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", // Mycket subtil skugga
                  }}
                />
                <TextField
                  variant="outlined"
                  value={editingTodo.description}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      description: e.target.value,
                    })
                  }
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <IconButton color="primary" onClick={handleSaveTodo}>
                  <Save />
                </IconButton>
                <IconButton color="secondary" onClick={handleCancelEdit}>
                  <Cancel />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText
                  primary={todo.title}
                  secondary={todo.description}
                  primaryTypographyProps={{
                    style: {
                      fontFamily: "Courier, monospace",
                      textDecoration: todo.is_completed
                        ? "line-through"
                        : "none",
                      color: todo.is_completed ? "#aaa" : "#333", // Mjukare färger
                      textShadow: "1px 1px 2px rgba(255, 255, 255, 0.5)", // Ljus skugga
                    },
                  }}
                  secondaryTypographyProps={{
                    style: {
                      fontFamily: "Arial, sans-serif",
                      fontSize: "14px",
                      color: "#555", // Ljusare textfärg
                      textShadow: "0.5px 0.5px 1px rgba(255, 255, 255, 0.3)", // Ljusare skugga
                    },
                  }}
                />
                <IconButton
                  color="secondary"
                  onClick={() => handleEditTodo(todo)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <Delete />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
