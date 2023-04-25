const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Cuenta = sequelize.define(
  'cuenta',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clasificacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipoCuenta: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

module.exports = Cuenta
