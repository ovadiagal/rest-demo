const express = require("express");
const fs = require("fs");
const { randomInt } = require("crypto");

const app = express();
app.listen(3000);

const DB = JSON.parse(fs.readFileSync("src/items.json", "utf8"));

app.get("/", (req, res) => {
  res.send("REST assignment for CS3300");
});

app.get("/api/products", (req, res) => {
  res.json(DB);
});

app.get("/api/products/:id", (req, res) => {
  if (!DB[req.params.id]) {
    return res.status(404).send("Product not found");
  }
  res.json(DB[req.params.id]);
});

app.post("/api/products", express.json(), (req, res) => {
  let id;
  do {
    id = randomInt(1, 100);
  } while (DB[id]);
  DB[String(id)] = {
    name: req.body.name,
    quantity: req.body.quantity,
  };
  res.status(201).send("Product created successfully");
});

app.put("/api/products/:id", express.json(), (req, res) => {
  if (!DB[req.params.id]) {
    return res.status(404).send("Product not found");
  }
  DB[req.params.id] = {
    name: req.body.name ?? DB[req.params.id].name,
    quantity: req.body.quantity ?? DB[req.params.id].quantity,
  };
  res.send("Product updated successfully");
});

app.delete("/api/products/:id", (req, res) => {
  if (!DB[req.params.id]) {
    return res.status(404).send("Product not found");
  }
  delete DB[req.params.id];
  res.send("Product deleted successfully");
});
