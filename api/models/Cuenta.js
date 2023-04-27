const {DataTypes} = require("sequelize");
const sequelize = require("../database/database.js");

// Corregir que no permita strings vacíos, validar adecuadamente el código de cuenta.

const clasificaciones = ["activo", "pasivo", "patrimonio", "ingreso", "gasto-ventas", "gasto-admin"]

const Cuenta = sequelize.define("cuenta", {
    codigo : {
        type : DataTypes.STRING,
        primaryKey : true,
        validate : {
            notEmpty : true,
            isCodigApropiado(value) {
                primerNumeroCodigo = parseInt(value.charAt(0));
                if (clasificaciones[primerNumeroCodigo - 1] !== this.clasificacion ) {
                    throw new Error("El código no es el correspondiente a la clasificación escogida. Los códigos se establecen como 1- Activo, 2- Pasivo, 3- Patrimonio, 4- Ingresos, 5- Gastos de ventas, 6- Gastos de administración ");
                }
                if (value.length < 4) {
                    throw new Error("El código debe de ser de al menos 4 carácteres.")
                }
                if (value.length % 2 !== 0) {
                    throw new Error("Formato incorrecto de códigos. Debe ingresar dos dígitos luego del código de la cuenta mayor. Ejemplo: Cuenta 1001, Subcuenta : 100101 ");
                }
            } 
        }
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
    },
    hasSubcuenta : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }
}, {
    timestamps : false,
    tableName : "cuenta"
});

module.exports = Cuenta;