const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;
const path = require("path")

const expiryTime = 36000;

exports.registerNewUser = (req, res) => {
  // fetch user details from request body
  const { name, email, username, password } = req.body;
  
  // check if user with this username exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res.status(400).json({ message: "email already exist" });
    }
    
    // create a new user
    User.create(
      {
        name,
        email,
        username,
        password
      },
      (err, newUser) => {
        if (err) {
          return res.status(500).json({ err });
        }
        
        // hash user's password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({ err });
          }
          
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
              return res.status(500).json({ err });
            }
            
            // save password to db
            newUser.password = hashedPassword;
            newUser.save((err, savedUser) => {
              if (err) {
                return res.status(500).json({ err });
              }
              
              // create jwt payload for user
              jwt.sign(
                {
                  id: newUser.id,
                  fullName: newUser.fullName,
                  username: req.body.username,
                  email: newUser.email,
                },
                SECRET,
                { expiresIn: expiryTime },
                (err, token) => {
                  if (err) {
                    return res.status(500).json({ err });
                  }

                  // send token to user
                  return res.status(200).sendFile(
                    path.join(__dirname, "../../frontend/static/homepage.html")
                  );
                }
              );
            });
          });
        });
      }
    );
  });
};

exports.loginUser = (req, res) => {
  const {email, username, password} = req.body;
  
  // check if user exists
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!foundUser) {
      return res.status(401).json({ message: "incorrect email " });
    }
    let match = bcrypt.compareSync(password, foundUser.password);
    if (!match) {
      return res.status(400).json({ message: "incorrect password" });
    }
    // create a token
    jwt.sign({
      id: foundUser._id,
      username: foundUser.username,
      name: foundUser.name,
      email: foundUser.email
    }, SECRET, {
      expiresIn: expiryTime
    }, (err, token) => {
      if (err) {
        return res.status(500).json({ err })
      }
      return res.status(200).json({
        message: "user logged in successfully",
        token
      })
    })
  })
}
