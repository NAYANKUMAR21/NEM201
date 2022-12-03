const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/db");
const productRouter = require("./features/producsts/product.router");
const userRouter = require("./features/auth/user.router");
app.use(express.json());
app.use(cors());
app.use("/product", productRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("WELCOME BACKEND HOME PAGE");
});

app.listen(8080, async () => {
  try {
    await connect();
    console.log(`listening on http://localhost:8080`);
  } catch (er) {
    console.log(er.message);
  }
});
