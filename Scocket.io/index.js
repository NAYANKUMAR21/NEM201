const express = require("express");
const { disconnect } = require("process");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
let user = {};

io.on("connection", (Socket) => {
  user[Socket.id] = 1;

  console.log("connection started on user", Socket.id);
  Socket.on("newNumber", (message) => {
    Socket.broadcast.emit("newNumber", message);
    console.log(message, "from the js", Socket.id);
  });
  Socket.on("disconnect", () => {
    user[Socket.id] = 0;
    console.log("A user disconneted", user);
  });
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
