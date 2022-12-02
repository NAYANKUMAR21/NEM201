const express = require("express");
const productModel = require("./product.model");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    let products = await productModel.find();
    return res.status(200).send(products);
  } catch (er) {
    return res.status(404).send(`${er.message} -->from product get route`);
  }
});

module.exports = app;
