const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http").createServer(app);
const io = new Server(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
let count = 0;
let user = [];
io.on("connection", (socket) => {
  count += 1;
  user.push(socket.id);
  console.log("Connected to server user", socket.id, user, count);

  if (user.length <= 2) {
    socket.broadcast.emit("second");
    socket.on("second", () => {
      io.emit("send");
    });

    socket.on("newNumber", (x) => {
      socket.broadcast.emit("addOther", x);
    });

    socket.on("disconnect", () => {
      count -= 1;
      user.pop();
      console.log("A user disconneted total user:", count);
    });
  }
});

http.listen(8080, () => {
  console.log("Listening on http://localhost:8080");
});
