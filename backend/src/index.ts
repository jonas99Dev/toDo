import path from "path";
// import lista from "./data/lista";
import axios from "axios";
import express, { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express"; //typning för middleware
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";
// import Prometheus from "prom-client";
import { TodoParams } from "./types";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ********  Prometheus

// const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
// collectDefaultMetrics();

// const httpRequestCounter = new Prometheus.Counter({
//   name: "http_requests_total",
//   help: " Total number of HTTP requests made",
//   labelNames: ["method", "route", "status"],
// });

// *********  Kanske lägger till detta igen om jag får tid

// Middleware för att räkna HTTP-förfrågningar
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.on("finish", () => {
//     httpRequestCounter.inc({
//       method: req.method,
//       route: req.route ? req.route.path : req.path,
//       status: res.statusCode,
//     });
//   });
//   next();
// });

// Exponera Prometheus metrics på en separat endpoint
// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", Prometheus.register.contentType);
//   res.end(await Prometheus.register.metrics());
// });

// app.get("/", (req, res) => {
//   res.send({ Hello: "world" });
// });

app.get("/api/todos", async (req: Request, res: Response) => {
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

app.get("/api/todos/title/:title", async (req: Request, res: Response) => {
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
app.get("/doings", (req: Request, res: Response) => {
  res.send("doings");
});

// posta todos
app.post("/api/todos", async (req: Request, res: Response) => {
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
app.delete<TodoParams>(
  "/api/todos/:id",
  async (req: Request<TodoParams>, res: Response) => {
    try {
      // const { id } = req.params;
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).send("Invalid id-format");
      }

      const result = await client.query(
        "DELETE FROM todos WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rowCount === 0) {
        res.status(404).send("Todo not found");
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

// console.log(lista);

//   endpoint för att uppdatera listan
app.put<TodoParams>(
  "/api/todos/:id",
  async (req: Request<TodoParams>, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, is_completed } = req.body;

      const result = await client.query(
        "UPDATE todos SET title = $1, description = $2, is_completed = $3, updated_at = NOW() WHERE id = $4 RETURNING  *",
        [title, description, is_completed, id]
      );

      if (result.rowCount === 0) {
        res.status(400).send("Todo not found");
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

app.use(express.static(path.join(path.resolve(), "dist")));

app.get("/api", (req: Request, res: Response) => {
  res.send({ Hello: "world" });
});

// Servera frontendens index.html som fallback
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(path.resolve(), "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`redo på http://localhost:${port}/`);
});
