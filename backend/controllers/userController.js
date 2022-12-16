const User = require("../model/userSchema");
const path = require("path");

exports.registerNewUser = async (req, res) => {
//Get user input from request body
const { name, email, password } =  new User(req.body);

//check if user exists
const oldUser= User.findOne({ email });

if(oldUser) { return res.status(401).send("User exists, please Login")}

const newUser = User.create({ name, email, password });

newUser.save();

res
.status(200)
.set("Content-Type, text/html")
.sendFile( path.join(__dirname, "../../frontend/static/homePage.html"))
}

exports.loginUser = async (req, res) => {
//Get user input from request body
const { name, email, password } =  new User(req.body);

//check if user exists
const existingUser= User.findOne({ email });

if(!existingUser) { return res.status(401).send("Invalid Credentials")}
  
res
  .status(200)
  .set("Content-Type, text/html")
  .sendFile(path.join(__dirname, "../../frontend/static/homePage.html"))
}