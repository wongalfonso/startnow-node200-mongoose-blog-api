const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

let uri = process.env.MONGODB_URI ||"mongodb://heroku_6ppd3vwr:5s5tqpnfbqd5kuv23s7rpg7ja9@ds235768.mlab.com:35768/heroku_6ppd3vwr"

mongoose.connect(uri);
mongoose.Promise = Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("use api/blogs or api/users");
});

app.use("/api/users", require("./routes/users"));

app.use("/api/blogs", require("./routes/blogs")); 


module.exports = app;