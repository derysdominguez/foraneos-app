const {Sequelize} = require("sequelize");


module.exports = new Sequelize("sjbscontable", "postgres", "junio 23", {
  host: "localhost",
  dialect: "postgres",
});
