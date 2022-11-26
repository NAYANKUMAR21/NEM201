const mongoose = require("mongoose");
const file = {
  name: { type: String },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  age: { type: String },
};

const userSchema = new mongoose.Schema(file);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
