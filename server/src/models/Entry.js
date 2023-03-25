const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Entry = sequelize.define('asiento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  monto: {
    type: DataTypes.NUMERIC(10, 2)
  }
}, {
  timestamps: false
})

module.exports = Entry
