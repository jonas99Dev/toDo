const lista = require("./src/data/lista");
const axios = require("axios");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ Hello: "world" });
});

//   Endpoint för att hämta listan
app.get("/doings", (req, res) => {
  res.send("doings");
});

console.log(lista);
//  Endpoint för att lägga till i listan
// app.post("/doings", (req, res) => {
//   res.send("doings");
// });

//   endpoint för att uppdatera listan
// app.put

app.listen(port, () => {
  console.log(`redo på http://localhost:${port}/`);
});
