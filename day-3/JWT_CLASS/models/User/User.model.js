//enum enumerater means other than that you cannot have something input
const mongoose = require("mongoose");

const file = {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  age: { type: Number },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },
};
const UserSchema = new mongoose.Schema(file);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
