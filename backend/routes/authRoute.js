const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

router
  .post("/signup", AuthController.registerNewUser)
  .post("/login", AuthController.loginUser);

module.exports = router;
