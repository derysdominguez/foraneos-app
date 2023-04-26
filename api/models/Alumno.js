const {DataTypes} = require("sequelize");
const sequelize = require("../database/database.js");
const Beca = require("./Beca.js");
// Validar que codigo coincida con el formato.
const Alumno = sequelize.define("alumno", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    codigo : {
        type: DataTypes.STRING(11),
        allowNull : false,
        validate : {
            len: [11,11]
        }
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
    becaid : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Beca,
            key : "id"
        }
    },
    activo : {
        type: DataTypes.BOOLEAN,
        defaultValue : true,
        allowNull : false
    },
    pago_perfecto : {
        type : DataTypes.BOOLEAN,
        defaultValue : true,
        alowNull : false
    }
}, {
    timestamps: false,
    tableName : "alumno"
});

Beca.hasMany(Alumno, {
    foreignKey: "becaid",
    sourceKey: "id"
});

Alumno.belongsTo(Beca, {
    foreignKey: 'becaid',
    targetId : "id"
});

module.exports = Alumno;