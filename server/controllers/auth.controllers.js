const validatePassword = require("../utils/validatePassword");
const UserModel = require("../models/User.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = await UserModel.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            password: bcrypt.hashSync(profile.id, 10),
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
const register = async (req, res) => {
  const { email, password, name, mobileNum } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (validatePassword(password) === false) {
      return res.status(400).json({
        error:
          "Password should contain letters, symbols and numbers. Length should be atleast 6.",
      });
    }
    const newUser = await UserModel.create({
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      mobileNum,
    });
    jwt.sign(
      { newUser },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { secure: true, sameSite: "none" })
          .status(201)
          .json({ user: newUser });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Wrong username or password." });
    }
    jwt.sign(
      { user },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(200)
          .json({ user: user });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Successfully logged out" });
  });
};
module.exports = {
  register,
  login,
  logout,
};
