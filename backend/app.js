// imports
const express = require("express");
const morgan = require("morgan");
require("./database/db");

// import routes
const userRoutes = require("./routes/userRoute");

const app = express();

// logs
app.use(morgan("dev"));

// Ajout des entetes pour les erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// pour form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route authentification
app.use("/api/auth", userRoutes);
module.exports = app;
