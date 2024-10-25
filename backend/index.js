const lista = require("./src/data/lista");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"),
  { Client } = require("pg");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ Hello: "world" });
});

// app.get("/api", async (req, res) => {
//   const { rows } = await client.query("SELECT * FROM cities WHERE name = $1", [
//     "Stockholm",
//   ]);

app.get("/api/todos", async (req, res) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM todos"
      // [req.query.title]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/api/todos/title/:title", async (req, res) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM todos WHERE title = $1",
      [req.params.title]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//   Endpoint för att hämta listan
app.get("/doings", (req, res) => {
  res.send("doings");
});

// posta doings
app.post("/api/todos", async (req, res) => {
  try {
    const { title, description, is_completed } = req.body;

    // sätt in data i databasen
    const result = await client.query(
      "INSERT INTO todos (title, description, is_completed) VALUES ($1, $2, $3) RETURNING *",
      [title, description, is_completed || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// app.post("/doings", (req, res) => {
//   res.send("doings");
// });

// uppdatera status

// ta bort uppgift
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Todo not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

console.log(lista);

//   endpoint för att uppdatera listan
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_completed } = req.body;

    const result = await client.query(
      "UPDATE todos SET title = $1, description = $2, is_completed = $3, updated_at = NOW() WHERE id = $4 RETURNING  *",
      [title, description, is_completed, id]
    );

    if (result.rowCount === 0) {
      return res.status(400).send("Todo not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`redo på http://localhost:${port}/`);
});
