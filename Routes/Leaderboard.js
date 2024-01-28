const express = require("express");
const router = express.Router();
const authenticateToken = require("../Middleware/Authenticate");
const Leaderboard = require("../Controllers/Leaderboard");

router.get("/:quizId", authenticateToken, Leaderboard.getLeaderboard);

module.exports = router;
