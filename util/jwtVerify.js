const jwt = require("jsonwebtoken");

function jwtVerify(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const bearerToken = bearerHeader.split(" ")[1];

  jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { jwtVerify };
