const {DataTypes} = require("sequelize");
const sequelize = require("../database/database.js");
const Beca = require("./Beca.js");

const Alumno = sequelize.define("alumno", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    codigo : {
        type: DataTypes.INTEGER,
        allowNull : false
    },
    nombre : {
        type: DataTypes.STRING,
        allowNull: false
    },
    grado : {
        type: DataTypes.INTEGER,
        min: 1,
        max: 13,
        allowNull : false
    },
    activo : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
        allowNull : false
    }
}, {
    timestamps: false
});

Beca.hasMany(Alumno, {
    foreignKey: "becaId",
    sourceKey: "id"
});

Alumno.belongsTo(Beca, {
    foreignKey: 'becaId',
    targetId : "id"
});

module.exports = Alumno;