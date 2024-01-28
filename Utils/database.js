const Sequelize = require("sequelize");

const sequelize = new Sequelize("quiz", "root", "Pass@123", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
