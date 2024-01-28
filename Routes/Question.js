const express = require("express");
const router = express.Router();

const authenticateToken = require("../Middleware/Authenticate");
const QuestionController = require("../Controllers/Question");

router.get("/", QuestionController.getQuestions);

router.get("/:id", QuestionController.getQuestionById);

router.post("/", authenticateToken, QuestionController.addQuestion);

router.put("/:id", authenticateToken, QuestionController.updateQuestion);

router.delete("/:id", authenticateToken, QuestionController.deleteQuestion);

router.get(
    "/randomQuestion/:quizId",
    QuestionController.getRandQuestionByQuizId
);
module.exports = router;
