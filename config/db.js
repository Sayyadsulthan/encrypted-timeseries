const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/encrypted-timeseries");

const db = mongoose.connection;

db.on("err", (err) => {
  console.error.bind(console, "error in connection to db", err);
});

db.once("open", () => {
  console.log("db is connected..");
});

module.exports = db;
