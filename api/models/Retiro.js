const {DataTypes} = require("sequelize");
const sequelize = require("../database/database.js");
const Alumno = require("./Alumno.js");
const moment = require("moment");

const Retiro = sequelize.define("retiro", {
    alumnoid : {
        type : DataTypes.INTEGER,
        primaryKey : false,
        references : {
            model : Alumno,
            key : "id"
        }
    },
    descripcion : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    fecha_retirado : {
        type : DataTypes.DATEONLY,
        allowNull : false,
        defaultValue : moment().format("YYYY-MM-DD")
    }
}, {
    timestamps : false,
    tableName : "retiro"
});

Alumno.hasOne(Retiro, {
    foreignKey : "alumnoid",
    sourceKey : "id"
});

Retiro.belongsTo(Alumno, {
    foreignKey : "alumnoid",
    targetId : "id"
});

module.exports = Retiro;