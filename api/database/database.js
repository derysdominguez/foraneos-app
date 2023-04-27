const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
<<<<<<< HEAD
  dialect: "postgres", 
  port : 4001
=======
  dialect: "postgres",
  logging : false
}, {
    freezeTableName : true
>>>>>>> 56642dd5da8ce6ec074e3eec7a080e679280b453
});

module.exports = sequelize;
