const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Cuenta = require("./Cuenta.js");
const Asiento = require("./Asiento.js");


const AsientoDetalle = sequelize.define("asientodetalle", {
    lado : {
        type : DataTypes.STRING(1),
        allowNull : false,
        validate : {
            isIn : [['d', 'h']]
        }
    },
    monto : {
        type : DataTypes.DOUBLE,
        allowNull : false,
        precision : 11,
        scale : 2,
        validate : {
            min : 0.01
        }
    },
    asientoid : {
        type : DataTypes.STRING(10),
        primaryKey : true,
        references : {
            model : Asiento,
            key : "codigo"
        }
    },

    cuentaid : {
        type: DataTypes.STRING,
        primaryKey : true,
        references : {
            model : Cuenta,
            key : "codigo"
        }
    }
}, {
    timestamps : false,
    tableName : "asientodetalle"
});

Asiento.hasMany(AsientoDetalle, {
    foreignKey : "asientoid",
    sourceKey : "codigo",
    onDelete : "CASCADE"
});

AsientoDetalle.belongsTo(Asiento, {
    foreignKey : "asientoid",
    targetId :  "codigo"
});

Cuenta.hasMany(AsientoDetalle, {
    foreignKey : "cuentaid",
    sourceKey : "codigo"
});

AsientoDetalle.belongsTo(Cuenta, {
    as : "cuenta",
    foreignKey : "cuentaid",
    targetId : "codigo"
});

module.exports = AsientoDetalle;

