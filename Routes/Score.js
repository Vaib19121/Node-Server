// routes/score.js
const express = require("express");
const router = express.Router();
const scoreController = require("../Controllers/Score");
const authenticateToken = require("../Middleware/Authenticate");

router.post("/", authenticateToken, scoreController.addScore);
router.get("/user/:userId", scoreController.getScoresByUser);
router.get("/quiz/:quizId", scoreController.getScoresByQuiz);

module.exports = router;
