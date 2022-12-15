const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.existingUser = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;

// exports.authenticateUser = (req, res, next) => {
//   // check if there is an authorization token
//   if (!req.headers.authorization) {
//     return res.status(401).json({
//       message: "Authentication is required",
//     });
//   }
//   let headerSplit = req.headers.authorization;

//   if(headerSplit[0] !== "Bearer") {
//     return res.status(401).json({
//         message: "authorization format is Bearer <token>"
//     })
//   }
//   let token = headerSplit[1];
// //   check validity
//   jwt.verify(token, SECRET, (err, decodedToken) => {
//     if (err) return res.status(500).json({ err })
//     if (!decodedToken) {
//         return res.status(401).json({message: "invalid authorization token, login to continue"})
//     }
//     // allow user to continue
//     next()
//   })
// };
