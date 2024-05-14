const jwt = require("jsonwebtoken");

export default function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
}
