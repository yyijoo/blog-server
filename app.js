// :::::::::::::::::::::::  connection ::::::::::::::::::::::: //

// express
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Express server has started on ${port}`);
});

// mongoose

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog");
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => console.log("connected to mongod server"));

// :::::::::::::::::::::::  router  ::::::::::::::::::::::: //

const api = require("./routes");
app.use("/api", api);

// cors configuration

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true
  })
);
