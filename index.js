const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
const sequelize = require("./Utils/database");
const routes = require("./Routes/index");
const User = require("./Models/User");
const Quiz = require("./Models/Quiz");
const Question = require("./Models/Question");
const Score = require("./Models/Score");
const Profile = require("./Models/Profile");
const Answer = require("./Models/Answer");
require("dotenv").config();
// cors

app.get("/", (req, res) => {
    res.send("Hello, Vaibhav!");
});

app.post("/webhook", (req, res) => {
    console.log("/webhook: ",req.body);
    res.send("Hello, Vaibhav! This is a webhook!");
} );

app.use((req, res, next) => {
    console.log(req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
        return res.status(200).json({});
    }
    next();
}
);

app.use(routes);

const PORT = 6000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

User.hasMany(Quiz, { onDelete: "CASCADE" });
Quiz.belongsTo(User);

User.hasOne(Profile, { onDelete: "CASCADE" });
Profile.belongsTo(User);

Quiz.hasMany(Question, { onDelete: "CASCADE" });
Question.belongsTo(Quiz);

User.hasMany(Score, { onDelete: "CASCADE" });
Score.belongsTo(User);

Quiz.hasMany(Score, { onDelete: "CASCADE" });
Score.belongsTo(Quiz);

Answer.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Answer, { foreignKey: "userId" });

Answer.belongsTo(Quiz, { foreignKey: "quizId" });
Quiz.hasMany(Answer, { foreignKey: "quizId" });

Answer.belongsTo(Question, { foreignKey: "questionId" });
Question.hasMany(Answer, { foreignKey: "questionId" });

sequelize
    .sync()
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log(err);
    });
