const { DataTypes } = require('sequelize')
const sequelize = require('../database/database.js')
const moment = require('moment')

const Deuda = sequelize.define(
  'deuda',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    acreedor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuota: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      precision: 11,
      scale: 2
    },
    monto_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      precision: 11,
      scale: 2
    },
    fecha_adquirida: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_finalizacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tasa: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      precision: 11,
      scale: 2,
    }
  },
  {
    timestamps: false,
    tableName : "deuda"
  }
)

// const Deuda = sequelize.define("deuda", {
//     id : {
//         type : DataTypes.INTEGER,
//         primaryKey : true,
//         autoIncrement : true
//     },
//     acreedor : {
//         type : DataTypes.STRING,
//         allowNull : false
//     },
//     cuota : {
//         type : DataTypes.DOUBLE,
//         allowNull : false,
//         precision : 11,
//         scale : 2,
//     },
//     monto_total : {
//         type : DataTypes.DOUBLE,
//         allowNull : false,
//         precision : 11,
//         scale : 2,
//     },
//     fecha_adquirida : {
//         type : DataTypes.DATEONLY,
//         allowNull : false,
//         defaultValue: moment().format("YYYY-MM-DD"),
//     },
//     fecha_finalizacion : {
//         type : DataTypes.DATEONLY,
//         allowNull : false,
//         validate : {
//             isAfter : this.fecha_adquirida
//         }
//     },
//     tasa : {
//         type : DataTypes.DOUBLE ,
//         allowNull : false,
//         precision : 11,
//         scale : 2,
//         validate : {
//             min : 0,
//             max : 1
//         }
//     },
//     tasa_porcentaje : {
//         type : DataTypes.VIRTUAL,
//         get() {
//             return `${this.tasa * 100}%`
//         },
//         set() {
//             throw new Error("El campo tasa_porcentaje es un virtual, no se establece así.")
//         }
//     },
//     activa : {
//         type : DataTypes.VIRTUAL,
//         get() {
//             return moment().format("YYYY-MM-DD") >= this.fecha_finalizacion;
//         },
//         set() {
//             throw new Error("Este campo activa es un virtual, no se puede establecer así.")
//         }
//     }

// }, {
//     timestamps : false
// });

module.exports = Deuda
