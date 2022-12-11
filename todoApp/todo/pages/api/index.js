const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  return res.send("Welcome to home page");
});

app.listen(8080, async () => {
    mongoose.set('strictQuery', false)
  await mongoose.connect("mongodb://127.0.0.1:27017/B20");
  console.log("lisening on http://localhost:8080");
});
