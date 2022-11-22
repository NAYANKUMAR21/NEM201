const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User/User.model");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.post("/signup", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).send("User created successfully");
  } catch (er) {
    res.send("CANNOT BE CREATED");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (user) {
      const token = jwt.sign(
        { id: user._id, name: user.name, age: user.age },
        "SECRET123"
      );
      return res.send({ message: "LOGIN SUCCESS", token });
    }
    return res.status(401).send("INVALID CREDIANTAILS");
  } catch (er) {
    res.send("CANNOT BE LOGGED IN");
  }
});
app.get("/user/:id", async (req, res) => {
  let { id } = req.params;
  const token = req.headers.token;
  console.log(req.headers)
  if (!token) {
    return res.send("Un authorized");
  }
  try {
    const verify = jwt.verify(token, "SECRET123");
    if (verify) {
      const user = await UserModel.findOne({ _id: id });
      res.send(user);
    }
  } catch (er) {
    return res.send("INVALID TOKEN");
  }
});
mongoose
  .connect(
    "mongodb+srv://NAYAN:NAYAN@cluster0.u60zxbv.mongodb.net/B21?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log(`listening on http://localhost:8080`);
    });
  });
