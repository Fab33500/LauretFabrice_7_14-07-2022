// importations
const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const password = require("../middelwares/password");

const router = express.Router();

router.post("/signup", password, userCtrl.signup);

module.exports = router;
