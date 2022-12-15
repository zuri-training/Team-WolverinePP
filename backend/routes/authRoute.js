// const express = require("express");
// const router = express.Router();
// const path = require("path");

const router = require("express").Router();
const  authenticateUser = require("../middlewares/authentication.js");
const authController = require("../controllers/authController.js");
const pageController = require("../controllers/pageController.js");
const chunkController = require("../controllers/chunkController.js");

//Set up routes for registration and Login

router
  .get("/", pageController.getLandingPage)
  .get("/signup", pageController.getSignUpPage)
  .get("/login", pageController.getLoginPage)
  .post("/signup", authenticateUser, authController.registerNewUser)
  .post("/login", authenticateUser, authController.loginUser)
  // .post("/library", authenticateUser, chunkController.split);

// const AuthController = require("../controllers/authController");

module.exports = router;
