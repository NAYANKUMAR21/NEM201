const mongoose = require("mongoose");
const file = {
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
};
const authSchema = new mongoose.Schema(file);
const authModel = mongoose.model("auth", authSchema);
module.exports = authModel;
