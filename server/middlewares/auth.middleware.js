const validateFrontendUrl = (req, res, next) => {
  if (!process.env.FRONTEND_URL) {
    return res.status(500).json({ error: "FRONTEND_URL is not defined" });
  }
  // Additional validation logic if needed
  next();
};

const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  })(req, res, next);
};


module.exports = { validateFrontendUrl, googleAuthCallback };