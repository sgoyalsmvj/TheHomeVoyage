const express = require("express");
const { register } = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);