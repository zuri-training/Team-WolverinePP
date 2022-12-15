const express = require("express");
const path = require("path");

const landingPage = path.join(__dirname, "../../frontend/static/landingPage.html");
const signupPage = path.join(__dirname, "../../frontend/static/sign-up.html");
const loginPage = path.join(__dirname, "../../frontend/static/Login.html");

//landing page
exports.getLandingPage = (req, res) => {
  res.sendFile(landingPage, (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
};

//Sign-up
exports.getSignUpPage = (req, res) => {
  res.sendFile(signupPage, (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
};

//Log in
exports.getLoginPage = (req, res) => {
  res.sendFile(loginPage, (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
};
