const lista = require("./src/data/lista");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"),
  { Client } = require("pg");
const Prometheus = require("prom-client");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new Prometheus.Counter({
  name: "http_requests_total",
  help: " Total numer of HTTP requests made",
  labelNames: ["method", "route", "status"],
});

// Middleware för att räkna HTTP-förfrågningar
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode,
    });
  });
  next();
});

// Exponera Prometheus metrics på en separat endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", Prometheus.register.contentType);
  res.end(await Prometheus.register.metrics());
});

app.get("/", (req, res) => {
  res.send({ Hello: "world" });
});

app.get("/api/todos", async (req, res) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM todos ORDER BY id ASC"
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

//   Endpoint för att hämta test-listan
app.get("/doings", (req, res) => {
  res.send("doings");
});

// posta todos
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
