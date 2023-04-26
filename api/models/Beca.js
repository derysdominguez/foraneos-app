const {DataTypes} = require("sequelize");
const sequelize = require("../database/database.js");


const Beca = sequelize.define("beca", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    tipo : {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    pago: {
        type: DataTypes.DECIMAL(11,2),
        allowNull : false
    }
}, {
    timestamps : false,
    tableName : "beca"
});

module.exports = Beca;