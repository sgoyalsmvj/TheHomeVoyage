const passport = require("passport");
const jwt = require("jsonwebtoken");

const validateFrontendUrl = (req, res, next) => {
  if (!process.env.FRONTEND_URL) {
    return res.status(500).json({ error: "FRONTEND_URL is not defined" });
  }
  next();
};

const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  })(req, res, next);
};

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    req.userData = userData;
    next();
  });
};


module.exports = { validateFrontendUrl, googleAuthCallback, authenticateUser };
