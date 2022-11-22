const express = require("express");
const userModel = require("./user.model");
const app = express.Router();
const jwt = require("jsonwebtoken");

app.get("/", async (req, res) => {
  try {
    res.send("NAYAN IN JWT ROUTE");
  } catch (er) {
    res.send(`${er.message}`);
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, name, age } = req.body;

  if (!email || !password || !name || !age) {
    return res.send("INVALID REQUEST FOR SIGNUP");
  }
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.send("USER ALREADY EXISTS");
    }
    const newUser = new userModel({ ...req.body });
    await newUser.save();
    return res.send("User created successfully");
  } catch (er) {
    res.send(`${er.message} inside prattcide`);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("INVALID CREDIANTAILS");
  }
  try {
    let user = await userModel.findOne({ ...req.body });
    if (user) {
      const token = jwt.sign({ id: user._id, name: user.name }, "NAYAN");
      return res.send({ message: "LOGIN SUCCESS", token });
    }
    return res.send("USER DOESN'T EXIST");
  } catch (er) {
    res.send("invalid token");
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.token;
  if (!id || !token) {
    return res.send("ID/TOKEN NOT PRESENT");
  }
  try {
    let verify = jwt.verify(token, "NAYAN");
    if (verify) {
      const user = await userModel.findOne({ _id: id });
      return res.send(user);
    }
  } catch (er) {
    return res.send("INVALID TOKEN");
  }
});

module.exports = app;
