const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const express = require("express");
const app = express();
app.use(express.json());
const userRouter = require("./router/auth.route");
const connect = async () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/Redis");
};
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("Welcome to HomePage");
});
app.listen(8080, async () => {
  await connect();
  console.log("listening on http://localhost:8080");
});
