const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

io.on("connection", (Socket) => {
  console.log("connection started on user");
  Socket.on("newText", (message) => {
    console.log(message, "from the js");
  });
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
