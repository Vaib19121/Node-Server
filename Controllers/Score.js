const Score = require("../Models/Score");

// Controller functions
exports.addScore = async (quizId, userId, isCorrect) => {
    try {
        // check if the user has already attempted the quiz or not
        const score = await Score.findOne({
            where: {
                userId,
                quizId,
            },
        });
        if (score) {
            // if the user has already attempted the quiz, update the score
            const scoreObj = score.toJSON();
            if (isCorrect) {
                const newScore = scoreObj.score + 1;
                await Score.update(
                    {
                        score: newScore,
                    },
                    {
                        where: {
                            userId,
                            quizId,
                        },
                    }
                );
                return newScore;
            }
            return scoreObj.score;
        } else {
            // if the user has not attempted the quiz, create a new score
            if (isCorrect) {
                await Score.create({
                    userId,
                    quizId,
                    score: 1,
                });
                return 1;
            } else {
                await Score.create({
                    userId,
                    quizId,
                    score: 0,
                });
                return 0;
            }
        }
    } catch (error) {
        console.error("Error adding score:", error);
        res.status(500).json({ error: "Error adding score" });
    }
};

exports.getScoresByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Retrieve scores for a user
        const userScores = await Score.findAll({ where: { userId } });
        res.json(userScores);
    } catch (error) {
        console.error("Error getting scores by user:", error);
        res.status(500).json({ error: "Error getting scores by user" });
    }
};

exports.getScoresByQuiz = async (req, res) => {
    const quizId = req.params.quizId;

    try {
        // Retrieve scores for a quiz
        const quizScores = await Score.findAll({ where: { quizId } });
        res.json(quizScores);
    } catch (error) {
        console.error("Error getting scores by quiz:", error);
        res.status(500).json({ error: "Error getting scores by quiz" });
    }
};
