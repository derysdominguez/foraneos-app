const {DataTypes} = require("sequelize");
const sequelize = require("../database/database.js");

// Corregir que no permita strings vacíos, validar adecuadamente el código de cuenta.

const Cuenta = sequelize.define("cuenta", {
    codigo : {
        type : DataTypes.STRING,
        primaryKey : true,
    },
    nombre : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    clasificacion : {
        type : DataTypes.STRING(30),
        allowNull : false,
        validate : {
            isIn : [["activo", "pasivo", "patrimonio", "ingreso", "gasto-admin", "gasto-ventas"]]
        }
    },
    naturaleza : {
        type : DataTypes.VIRTUAL,
        get() {
            if (["pasivo", "patrimonio", "ingreso"].includes(this.clasificacion)) return "h";
            if (["activo", "gasto-admin", "gasto-ventas"].includes(this.clasificacion)) return "d";
        }, 
        set(value) {
            throw new Error("Este campo no se debería agregar así.");
        }
    }
}, {
    timestamps : false
});

module.exports = Cuenta;