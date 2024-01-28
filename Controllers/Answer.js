const Answer = require("../Models/Answer");
const Question = require("../Models/Question");
const Score = require("./Score");

exports.SubmitAnswer = async (req, res) => {
    try {
        console.log(req.body);
        if (
            !req.body.answer ||
            req.body.answer == "" ||
            !req.body.questionId ||
            req.body.questionId == "" ||
            !req.body.quizId ||
            req.body.quizId == ""
        ) {
            res.status(400).json({
                error: "Bad Request",
            });
            return;
        }
        const question = await Question.findByPk(req.body.questionId);
        if (!question) {
            res.status(404).json({
                error: "Question not found",
            });
            return;
        }

        // Check if user has already submitted an answer for the same question
        const existingAnswer = await Answer.findOne({
            where: {
                userId: req.user.id,
                questionId: req.body.questionId,
            },
        });
        if (existingAnswer) {
            res.status(400).json({
                error: "Answer already submitted for this question",
            });
            return;
        }

        if (question.correctOption == req.body.answer) {
            req.body.isCorrect = true;
        } else {
            req.body.isCorrect = false;
        }
        const answer = await Answer.create({
            userId: req.user.id,
            quizId: req.body.quizId,
            answer: req.body.answer,
            questionId: req.body.questionId,
            isCorrect: req.body.isCorrect,
        });
        if (!answer) {
            res.status(500).json({
                error: "Internal Server Error",
            });
            return;
        }
        // Update score
        const updatedscore = await Score.addScore(
            req.body.quizId,
            req.user.id,
            req.body.isCorrect
        );
        res.status(201).json({
            message: "Answer submitted successfully",
            score: updatedscore,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
