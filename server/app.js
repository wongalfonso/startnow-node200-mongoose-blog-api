const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

let uri = "mongodb://heroku_6ppd3vwr:5s5tqpnfbqd5kuv23s7rpg7ja9@ds235768.mlab.com:35768/heroku_6ppd3vwr";

mongoose.connect(process.env.MONGODB_URI || uri);

mongoose.Promise = Promise;

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("use api/blogs or api/users");
});

app.use("/api/users", require("./routes/users"));

app.use("/api/blogs", require("./routes/blogs")); 


module.exports = app;