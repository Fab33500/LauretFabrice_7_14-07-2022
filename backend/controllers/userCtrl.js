// import
const dotenv = require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

exports.login = (req, res, next) => {
  console.log("-------> req.body.email");
  console.log(req.body.email);

  console.log("-------> req.body.password");
  console.log(req.body.password);

  // chiffrer l'email de la requette pour le comparer à l'email chiffré dans la BDD
  const emailCryptoJs = cryptoJs
    .HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL)
    .toString();
  console.log("------< emailcryptoJs>");
  console.log(emailCryptoJs);

  // verifier si l'user est dans la bd
  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          console.log("<<<<<<valid");
          console.log(valid);

          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, `${process.env.JWT_TOKEN}`, {
              expiresIn: "24h",
            }),
            msg: "Mot de passe correct",
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
