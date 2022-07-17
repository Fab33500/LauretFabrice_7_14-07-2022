// import
const dotenv = require("dotenv").config();
const User = require("../models/User");

// hash du password
const bcrypt = require("bcrypt");
//chiffre email
const cryptoJs = require("crypto-js");

exports.signup = (req, res, next) => {
  const emailCryptoJs = cryptoJs
    .HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL)
    .toString();

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailCryptoJs,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé dans la bd !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
