const jwt = require('jsonwebtoken')
const secret = "verySecureSECRET";

exports.authenticateUser = (req, res, next) => {
  // check if there is an authorization token
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Authentication is required",
    });
  }
  let headerSplit = req.headers.authorization;

  if(headerSplit[0] !== "Bearer") {
    return res.status(401).json({
        message: "authorization format is Bearer <token>"
    })
  }
  let token = headerSplit[1];
//   check validity
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) return res.status(500).json({ err })
    if (!decodedToken) {
        return res.status(401).json({message: "invalid authorization token, login to continue"})
    }
    // allow user to continue
    next()
  })
};
