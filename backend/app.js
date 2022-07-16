// imports
const express = require("express");
const morgan = require("morgan");
require("./database/db");

const app = express();

// logs
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("requête");
  next();
});
app.use((req, res) => {
  res.status(201);
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
