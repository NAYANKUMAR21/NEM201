const express = require("express");
const app = express();
const { sudentRouter, teacherRouter } = require("./routes/index");
const auth = require("./middleware/auth.middleware");
const time = require("./middleware/timer.middleware");

app.use(express.json());
app.use(auth);
app.use(time(new Date().toISOString()));

app.use("/student", sudentRouter);
app.use("/teacher", teacherRouter);

app.listen(8080, () => {
  console.log(`listening on http://localhost:8080`);
});
