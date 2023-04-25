const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres", 
  port: 4001,
  define : {
    frezeTableName : true
  }
});
module.exports = sequelize;
