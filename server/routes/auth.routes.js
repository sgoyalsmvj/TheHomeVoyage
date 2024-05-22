const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  logout,
  googleAuth,
  getProfile,
} = require("../controllers/auth.controllers");
const { googleAuthCallback, authenticateUser } = require("../middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/profile",authenticateUser, getProfile);
// Google OAuth Routes
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get("/google/callback", googleAuthCallback, googleAuth);

module.exports = authRouter;
