const express = require("express");
const { register, login, logout } = require("../controllers/auth.controllers");
const passport = require("passport");
const generateToken = require("../utils/generateToken");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get('/logout', logout);
// GOOGLE OAUTH ROUTES

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http:localhost:5173/login",
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .redirect("http://localhost:5173/homepage");
  }
);


module.exports = authRouter;
