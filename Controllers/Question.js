const Question = require("../Models/Question");
const Quiz = require("../Models/Quiz");

exports.getQuestions = async (req, res) => {
    try {
        const question = await Question.findAll();
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (quiz) {
            const questions = await quiz.getQuestions();
            res.json(questions);
        } else {
            res.status(404).json({
                error: "Quiz not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.addQuestion = async (req, res) => {
    try {
        console.log(req.user.id);
        const quiz = await Quiz.findByPk(req.body.quizId);

        if (req.user.id != quiz.userId) {
            return res.status(401).json({
                error: "You are not authorized to add questions to this quiz",
            });
        }
        const question = await quiz.createQuestion({
            questionText: req.body.questionText,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            correctOption: req.body.correctOption,
        });

        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
            text: error,
        });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (question) {
            const quiz = await Quiz.findByPk(question.quizId);
            if (req.user.id != quiz.userId) {
                return res.status(401).json({
                    error: "You are not authorized to update this question",
                });
            }
            if (req.body.questionText)
                question.questionText = req.body.questionText;
            if (req.body.option1) question.option1 = req.body.option1;
            if (req.body.option2) question.option2 = req.body.option2;
            if (req.body.option3) question.option3 = req.body.option3;
            if (req.body.option4) question.option4 = req.body.option4;
            if (req.body.correctOption)
                question.correctOption = req.body.correctOption;
            await question.save();
            res.json(question);
        } else {
            res.status(404).json({
                error: "Question not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (question) {
            const quiz = await Quiz.findByPk(question.quizId);
            if (req.user.id != quiz.userId) {
                return res.status(401).json({
                    error: "You are not authorized to update this question",
                });
            }
            await question.destroy();
            res.json("Question Deleted");
        } else {
            res.status(404).json({
                error: "Question not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.getRandQuestionByQuizId = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.quizId);
        if (quiz) {
            const questions = await quiz.getQuestions();
            if (questions.length > 0) {
                const randIndex = Math.floor(Math.random() * questions.length);
                res.json(questions[randIndex]);
            } else {
                res.status(404).json({
                    error: "No questions found for this quiz",
                });
            }
        } else {
            res.status(404).json({
                error: "Quiz not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
