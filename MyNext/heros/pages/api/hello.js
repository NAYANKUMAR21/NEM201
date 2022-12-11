// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const heroModel = require("./hero.model");

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    return mongoose.connect("mongodb://127.0.0.1:27017/B20");
  } catch (er) {
    console.log(er.message);
  }
};
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await heroModel.find();
    return res.status(201).send(data);
  } catch (er) {
    return res.status(404).send(er.message);
  }
});
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await heroModel.findOne({ _id: id });
    return res.status(201).send(data);
  } catch (er) {
    console.log(er.message);
    return res.status(404).send(er.message);
  }
});
app.listen(8080, async () => {
  try {
    await connect();
    console.log("http://localhost:8080");
  } catch (er) {
    console.log(er.message);
  }
});
