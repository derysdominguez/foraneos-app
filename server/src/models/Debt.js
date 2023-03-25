const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')
const Entry = require('./Entry')

const Debt = sequelize.define('deuda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  acreedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cuota: {
    type: DataTypes.NUMBER(11, 2),
    allowNull: false
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tasa: {
    type: DataTypes.NUMBER(11, 2),
    allowNull: false
  }
})

Debt.belongsTo({
  model: Entry,
  foreignKey: 'asiento_id',
  allowNull: false
})

module.exports = Debt
