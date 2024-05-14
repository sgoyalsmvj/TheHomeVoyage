import generateToken from "../utils/generateToken";
import validatePassword from "../utils/validatePassword";

const bcrypt = require("bcryptjs");

export const register = async (req, res) => {
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
      googleId: null,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      name,
      mobileNum,
    });
    res
      .cookie("token:", generateToken(newUser))
      .status(201)
      .json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Wrong username or password." });
    }
    res.cookie("token", generateToken(user).status(200).json({ user }));
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  register,login
};
