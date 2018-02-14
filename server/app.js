const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const homepage = require("./routes/homepage")

mongoose.connect("mongodb://localhost/my-blog");

mongoose.Promise = Promise;

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send(homepage);
});

app.use("/api/users", require("./routes/users"));

app.use("/api/blogs", require("./routes/blogs")); 


module.exports = app;