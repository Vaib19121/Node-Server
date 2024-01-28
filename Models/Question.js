// models/question.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Utils/database");
const Quiz = require("./Quiz");

const Question = sequelize.define("Question", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    option1: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    option2: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    option3: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    option4: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    correctOption: {
        type: DataTypes.ENUM("option1", "option2", "option3", "option4"),
        allowNull: false,
    },
});

module.exports = Question;
