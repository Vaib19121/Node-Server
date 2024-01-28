const Quiz = require("../Models/Quiz");

exports.getQuizzes = async (req, res) => {
    try {
        const quiz = await Quiz.findAll();
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (quiz) {
            res.json(quiz);
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

exports.addQuiz = async (req, res) => {
    try {
        console.log(req.user);
        const quiz = await req.user.createQuiz({
            title: req.body.title,
            description: req.body.description,
        });
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (quiz) {
            if (req.body.title) quiz.title = req.body.title;
            if (req.body.description) quiz.description = req.body.description;
            await quiz.save();
            res.json(quiz);
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

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (quiz) {
            await quiz.destroy();
            res.json({
                message: "Quiz deleted successfully",
            });
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
