const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Asiento = require('./Asiento')
const Alumno = require('./Alumno')

const Mensualidad = sequelize.define(
  'mensualidad',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    mes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anio: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

Mensualidad.belongsTo(Alumno, { foreignKey: 'alumno_id' })
Mensualidad.belongsTo(Asiento, { foreignKey: 'asiento_id' })

module.exports = Mensualidad
