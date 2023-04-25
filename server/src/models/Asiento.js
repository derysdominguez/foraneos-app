const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Asiento = sequelize.define(
  'asiento',
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
    descripcion: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)

module.exports = Asiento
