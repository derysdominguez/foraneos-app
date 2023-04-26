const {DataTypes} = require("sequelize");
const sequelize = require("../database/database.js");
const moment = require("moment");

const Retiro = sequelize.define("retiro", {

}, {
    timestamps : false,
    tableName : "retiro"
});

module.exports = Retiro;