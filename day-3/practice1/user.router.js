const { response } = require("express");
const express = require("express");
const userModel = require("./user.model");
const jwt = require("jsonwebtoken");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    return res.send("User router");
  } catch (er) {
    console.log(er.message);
    return res.send(`${er.message}`);
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, age, name } = req.body;
  if (!email || !name || !password || !age) {
    return res.send("invalid credaintails");
  }
  try {
    const user = new userModel(req.body);
    await user.save();
    return res.send("USer created successfully");
  } catch (er) {
    return res.send(`${er.message}`);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send("enter credaintails");
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        "SECRET123",
        {
          expiresIn: "7 days",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        "REFRESH",
        {
          expiresIn: "8 days",
        }
      );
      return res.send({ message: "Login Successfull", token, refreshToken });
    }
  } catch (er) {
    return res.send(`${er.message}`);
  }
});

app.post("/refresh", async (req, res) => {
  const refreshToken = req.headers.refreshtoken;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.send("no refresh token");
  }
  try {
    const verify = jwt.verify(refreshToken, "REFRESH");
    if (verify) {
      const newToken = jwt.sign(
        { id: verify.id, name: verify.name, email: verify.email },
        "SECRET123",
        {
          expiresIn: "7 days",
        }
      );
      return res.send({
        message: "basic token created succesfull",
        token: newToken,
      });
    }
    return res.send("User doesn't exist");
  } catch (er) {
    return res.send(`${er.message}`);
  }
});

module.exports = app;
