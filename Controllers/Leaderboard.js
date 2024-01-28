const Profile = require("../Models/Profile");
const Score = require("../Models/Score");

exports.getLeaderboard = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const scores = await Score.findAll({
            where: {
                quizId: quizId,
            },
            order: [["score", "DESC"]],
        });
        const leaderboard = [];
        for (let i = 0; i < scores.length; i++) {
            const profile = await Profile.findOne({
                where: {
                    userId: scores[i].userId,
                },
            });
            leaderboard.push({
                name: profile.firstName + " " + profile.lastName,
                score: scores[i].score,
            });
        }
        res.status(200).json({
            leaderboard: leaderboard,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error!",
        });
    }
};
