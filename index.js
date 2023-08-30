const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
const ejs = require("ejs");
const db = require("./config/db");

// setup the chat server to used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chatSockets").chatSockets(chatServer);
chatServer.listen(process.env.CHAT_PORT);
console.log("socket is listening on port : 5000");

app.use(express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  return res.render("home.ejs");
});

app.listen(port, (err) => {
  if (err) {
    console.log("err", err);
    return;
  }
  console.log("express server running on port :", port);
});
