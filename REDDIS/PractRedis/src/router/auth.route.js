const mongoose = require("mongoose");
const express = require("express");
const authModel = require("./auth.model");
const app = express.Router();
const jwt = require("jsonwebtoken");
const redis = require("redis").createClient();
redis.on("error", (err) => console.log("Redis Client Error", err));

app.post("/signup", async (req, res) => {
  const { email, password, name, age } = req.body;
  if (!email || !password || !name || !age) {
    return res.status(403).send("Un authorized");
  }
  try {
    let x = await authModel.findOne({ email });
    if (x) {
      return res.status(403).send("User already exists");
    } else {
      const createUser = new authModel({ email, name, age, password });
      await createUser.save();
      res.status(201).send(createUser);
    }
  } catch (er) {
    console.log(er.message);
    res.status(404).send(er.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password) {
    return res.status(403).send("Un-authorized");
  }
  try {
    const x = await authModel.findOne({ email });
    if (x) {
      const token = jwt.sign(
        { name: x.name, id: x._id, email: x.email },
        "TOKENA",
        {
          expiresIn: "7 days",
        }
      );
      const refreshToken = jwt.sign(
        { name: x.name, id: x._id, email: x.email },
        "TOKENB",
        {
          expiresIn: "28 days",
        }
      );
      await redis.connect();
      await redis.HSET(
        "USER",
        "feild1",
        token,
        JSON.stringify(["feild2", refreshToken])
      );
      const value = await redis.HGETALL("USER");
      //   console.log(value);
      await redis.disconnect();
      return res.status(200).send({ message: "Login Successfull", value });
    }
    return res.status(403).send("User doesn't exists");
  } catch (er) {
    console.log(er.message);
    res.status(404).send(er.message);
  }
});

module.exports = app;
