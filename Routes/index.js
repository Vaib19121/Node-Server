const express = require("express");
const router = express.Router();
const Auth = require("./Authentication");
const Quiz = require("./QuizRoutes");
const profile = require("./profile");
const Question = require("./Question");
const Score = require("./Score");
const Answer = require("./Answer");
const Leaderboard = require("./Leaderboard");

// Aunthentication
router.use("/auth", Auth);

// Quiz
router.use("/quiz", Quiz);

// profile
router.use("/profile", profile);

// Question
router.use("/question", Question);

// Score
router.use("/score", Score);

// Answer
router.use("/answer", Answer);

// Leaderboard
router.use("/leaderboard", Leaderboard);

module.exports = router;
