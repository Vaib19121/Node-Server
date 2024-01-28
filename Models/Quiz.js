const { DataTypes } = require("sequelize");
const sequelize = require("../Utils/database");
const Sequelize = require("sequelize");

const Quiz = sequelize.define("quiz", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = Quiz;
