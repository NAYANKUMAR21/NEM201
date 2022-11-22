const mongoose = require("mongoose");
const file = {
  name: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  age: { type: Number },
};
const userSchema = new mongoose.Schema(file);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
