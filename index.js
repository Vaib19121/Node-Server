const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
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
const { sendMail } = require("./Utils/SendEmail");

require("dotenv").config();
// cors

app.get("/", (req, res) => {
    res.send("Hello, Vaibhav!");
});

// send email 
app.post("/send-email",(req,res)=>{
    const {username,time_slot,phone,email} = req.body
    sendMail(process.env.EMAILTO,`Appointment for ${username}`,null, `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #4CAF50;">New Appointment Scheduled</h2>
            <p>Dear Admin,</p>
            <p>You have a new appointment scheduled. Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${username}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Appointment Time Slot:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${time_slot}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
                </tr>
            </table>
            <p style="margin-top: 20px;">Please contact the client for any further details or changes to the appointment.</p>
            <p style="margin-top: 20px;">Best regards,<br>Sparkle & Shine Autocare</p>
        </div>
        `)
        return  res.status(200).json({
            text: "Message Sent",
        });
})

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
