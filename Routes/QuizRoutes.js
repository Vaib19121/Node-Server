const express = require("express");
const router = express.Router();

const authenticateToken = require("../Middleware/Authenticate");
const QuizController = require("../Controllers/Quiz");

router.get("/", QuizController.getQuizzes);

router.get("/:id", QuizController.getQuizById);

router.post("/", authenticateToken, QuizController.addQuiz);

router.put("/:id", authenticateToken, QuizController.updateQuiz);

router.delete("/:id", authenticateToken, QuizController.deleteQuiz);

module.exports = router;
