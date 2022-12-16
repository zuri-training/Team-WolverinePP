const path = require("path");

const landingPage = path.join(__dirname, "../../frontend/static/index.html");
const signupPage = path.join(__dirname, "../../frontend/static/sign-up.html");
const loginPage = path.join(__dirname, "../../frontend/static/Login.html");

//landing page
exports.getLandingPage = (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(landingPage)
};

//Sign-up
exports.getSignUpPage = (req, res) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(signupPage);
};

//Log in
exports.getLoginPage = (req, res) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(loginPage);
};