const jwt = require("jsonwebtoken");

export default function generateToken(user) {
  jwt.sign(
    user,
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    },
    (err, token) => {
      if (err) throw err;
      return token;
    }
  );
}
