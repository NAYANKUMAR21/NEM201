const mongoose = require("mongoose");
const file = {
  category_name: { type: String },
  image: { type: String },
  title: { type: String },
  price: { type: String },
  button: { type: String },
};
const productSchema = new mongoose.Schema(file);
const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
