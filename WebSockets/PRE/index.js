const express = require("express");
const app = express();
const server = require("http").createServer(app);


const webSocket = require("ws");

const wss = new webSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client is connected ");
  ws.send("Welcome new client!");
  ws.on("message", function message(message) {
    console.log("received: %s", message);
    ws.send("Got you message " + message);
  });
});

app.get("/", async (req, res) => {
  try {
    res.send("Hello world!");
  } catch (er) {
    console.log(er.message);
    res.send(`${er.message} from get route`);
  }
});

app.listen(8080, () => {
  console.log(`listening on http://localhost:8080`);
});
