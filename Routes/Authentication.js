const express = require("express");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Auth = require("../Controllers/Authentication");

router.post("/login", Auth.login);

router.post("/register", Auth.register);

router.post("/ForgotPassword", Auth.ForgotPassword);

router.post("/verify-otp", Auth.VerifyOtp);

router.post("/reset-password/:token", Auth.ResetPassword);

router.post("/logout", Auth.logout);

module.exports = router;
