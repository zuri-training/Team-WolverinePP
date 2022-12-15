const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "verySecureSECRET";
const expiryTime = 3600;
const username = (exports.registerNewUser = (req, res) => {
  // fetch user details from body
  // check of user with this email exists
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res.status(400).json({ message: "email already exist" });
    }
    // create a new user
    User.create(
      {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
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
          bcrypt.hash(req.body.password, salt, (err, harshedPassword) => {
            if (err) {
              return res.status(500).json({ err });
            }
            // save password to db
            newUser.password = harshedPassword;
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
                secret,
                { expiresIn: expiryTime },
                (err, token) => {
                  if (err) {
                    return res.status(500).json({ err });
                  }
                  // send token to user
                  return res.status(200).json({
                    message: "Registration successful",
                    token,
                  });
                }
              );
            });
          });
        });
      }
    );
  });
});

exports.loginUser = (req, res) => {
  // check if user exists
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!foundUser) {
      return res.status(401).json({ message: "incorrect email " });
    }
    let match = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "incorrect password" });
    }
    // create a token
    jwt.sign(
      {
        id: foundUser._id,
        fullName: foundUser.fullName,
        username: req.body.username,
        email: foundUser.email,
      },
      secret,
      {
        expiresIn: expiryTime,
      },
      (err, token) => {
        if (err) {
          return res.status(500).jsom({ err });
        }
        return res.status(200).json({
          message: "user logged in successfully",
          token,
        });
      }
    );
  });
};
