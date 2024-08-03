const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgresql://quizdb_zl09_user:e13mLRnIQOYXhYx7fTbuhbQlHi7jezYm@dpg-cqmt0gdsvqrc73ff940g-a.virginia-postgres.render.com/quizdb_zl09?ssl=true", {
    dialect: "postgres",
    host: "",
});

module.exports = sequelize;
