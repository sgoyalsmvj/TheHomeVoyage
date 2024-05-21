const express = require("express");
const { register, login, logout } = require("../controllers/auth.controllers");
const passport = require("passport");
const generateToken = require("../utils/generateToken");
const {
  validateFrontendUrl,
  googleAuthCallback,
} = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
// GOOGLE OAUTH ROUTES

authRouter.get(
  "/google/callback",
  validateFrontendUrl,
  googleAuthCallback,
  (req, res) => {
    const token = generateToken(req.user);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .redirect(`${process.env.FRONTEND_URL}/homepage`);
  }
);

module.exports = authRouter;

/* 
User Initiates Login:

The user clicks a "Login with Google" button on your frontend.
This button sends a request to /auth/google (handled by the first route).
Redirect to Google:

Passport's google strategy redirects the user to Google's OAuth 2.0 server for authentication.
User Authenticates with Google:

The user logs in to their Google account and grants permission to your app.
Google Redirects Back:

After successful authentication, Google redirects the user back to your app's callback URL (/auth/google/callback) with an authorization code.
Handle Callback:

The second route processes this callback. Passport exchanges the authorization code for an access token and retrieves the user's profile information from Google.
If successful, the user is authenticated, a JWT token is generated and sent to the client in an HTTP-only cookie, and the user is redirected to your frontend.
*/
