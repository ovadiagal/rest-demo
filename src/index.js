const express = require("express");
const fs = require("fs");
const { randomInt } = require("crypto");

const app = express();
app.listen(3000);

app.get("/", (req, res) => {
  res.send("REST assignment for CS3300");
});

app.get("/api/products", (req, res) => {
  fs.readFile("src/items.json", "utf8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.get("/api/products/id", (req, res) => {
  const id = req.query.id;
  fs.readFile("src/items.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const product = products.find((p) => p.id == parseInt(id));
    res.json(product);
  });
});

app.post("/api/products", express.json(), (req, res) => {
  fs.readFile("src/items.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const newProduct = req.body;
    newProduct.id = randomInt(1, 1000);
    products.push(newProduct);
    fs.writeFile("src/items.json", JSON.stringify(products), () => {
      res.send(`${req.body["name"]} created successfully`);
    });
  });
});

app.put("/api/products/id", express.json(), (req, res) => {
  const id = req.query.id;
  fs.readFile("src/items.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const index = products.findIndex((p) => p.id == parseInt(id));
    products[index] = { ...products[index], ...req.body };
    fs.writeFile("src/items.json", JSON.stringify(products), () => {
      res.send(`${req.body["name"]} updated successfully`);
    });
  });
});

app.delete("/api/products/id", (req, res) => {
  const id = req.query.id;
  fs.readFile("src/items.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const index = products.findIndex((p) => p.id === id);
    products.splice(index, 1);
    fs.writeFile("src/items.json", JSON.stringify(products), () => {
      res.send("Product deleted successfully");
    });
  });
});
