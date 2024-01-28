const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Utils/database");

const Answer = sequelize.define("Answer", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});
module.exports = Answer;
