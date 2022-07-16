// imports
const express = require("express");
const morgan = require("morgan");

const app = express();

// logs
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("requête");
  next();
});
app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
