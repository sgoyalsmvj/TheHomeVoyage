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
module.exports = {
  register,
};
