const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Bruno:EimruW9dmDd0EBUv@cluster0.e15hi.mongodb.net/Mean?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("ERROR: Connection Failed!");
  });

/*app.use((req, res, next) => {
  console.log("first");
  next(); //É IMPORTANTE usar next() senão enviarmos uma resposta
});*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

//Cors setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
