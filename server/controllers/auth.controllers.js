const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/User");
const validatePassword = require("../utils/validatePassword");

// Google OAuth Strategy Configuration
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
          user = await UserModel.create({
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

// Register User
const register = async (req, res) => {
  const { email, password, name, mobileNum } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password should contain letters, symbols, and numbers. Length should be at least 6.",
      });
    }
    const newUser = await UserModel.create({
      email,
      password: bcrypt.hashSync(password, 10),
      name,
      mobileNum,
    });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );
    res
      .cookie("token", token, { secure: true, sameSite: "none" })
      .status(201)
      .json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Wrong username or password." });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );
    res
      .cookie("token", token, { secure: true, sameSite: "none" })
      .status(200)
      .json({ user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout User
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("token", " ", { secure: true, sameSite: "none" });
    res.status(200).json({ message: "Successfully logged out" });
  });
};

const googleAuth = (req, res) => {
  try {
    jwt.sign(
      { id: req.user._id, email: req.user.email, name: req.user.name },
      process.env.JWT_SECRET,
      { expiresIn: "10d" },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            secure: true,
            sameSite: "none",
          })
          .status(200)
          .redirect(`${process.env.FRONTEND_URL}/`);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.userData;
  UserModel.findById(id)
    .then((user) =>
      res.json({ name: user.name, email: user.email, id: user._id })
    )
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "internal server error" });
    });
};
module.exports = {
  register,
  login,
  logout,
  googleAuth,
  getProfile,
};
