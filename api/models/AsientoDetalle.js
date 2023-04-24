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
        type : DataTypes.DECIMAL(11,2),
        allowNull : false,
        validate : {
            min : 0.01
        }
    }
}, {
    timestamps : false
});

Asiento.hasMany(AsientoDetalle, {
    foreignKey : "asientoId",
    sourceKey : "codigo"
});

AsientoDetalle.belongsTo(Asiento, {
    foreignKey : "asientoId",
    targetId :  "codigo"
});

Cuenta.hasMany(AsientoDetalle, {
    foreignKey : "cuentaId",
    sourceKey : "codigo"
});

AsientoDetalle.belongsTo(Cuenta, {
    foreignKey : "cuentaId",
    targetId : "codigo"
});

module.exports = AsientoDetalle;

