const {DataTypes} = require("sequelize");
const sequelize = require("../database/database.js");
const moment = require("moment");
const Alumno = require("./Alumno.js");

const mesesOrden = [
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
  ];

const Mensualidad = sequelize.define("mensualidad", {
    alumnoid : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        references : {
            model : Alumno,
            key : "id"
        }
    },
    mes : {
        type : DataTypes.STRING(12),
        primaryKey : true,
        validate : {
            isIn : [['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'septiembre', 'octubre', 'noviembre', 'diciembre']]
        }
    },
    fecha_pago : {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate : {
            isAfter : (fecha) => {
                const fechaActual = new Date();
                const anioAcademico = fechaActual.getMonth() >= 6 ? fechaActual.getFullYear() : fechaActual.getFullYear() - 1;
                const fechaInicioRango = new Date(anioAcademico, 6, 1);
                return fecha >= fechaInicioRango
            },
            isBefore : moment().add(1, 'day').format('YYYY-MM-DD')
        }
    },
    orden : {
        type : DataTypes.VIRTUAL,
        get(){
            return mesesOrden.indexOf(this.mes);
        }
    }
}, {
    timestamps : false,
    tableName : "mensualidad"
});

Alumno.hasMany(Mensualidad, {
    foreignKey : "alumnoid",
    sourceKey : "id"
});

Mensualidad.belongsTo(Alumno, {
    foreignKey : "alumnoid",
    targetId : "id"
});


module.exports = Mensualidad;