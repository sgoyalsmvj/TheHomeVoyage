const jwt = require("jsonwebtoken");

 function generateToken(user) {
  jwt.sign(
    user.toJSON() ,
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

module.exports = generateToken;