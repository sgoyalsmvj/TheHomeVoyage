const express = require("express");
const { register, login } = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);