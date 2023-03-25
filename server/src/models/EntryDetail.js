const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Entry = require('./Entry')
const Account = require('./Account')

const EntryDetail = sequelize.define('asiento_detalle', {
  lado: {
    type: 'naturaleza',
    allowNull: false
  },
  monto: {
    type: DataTypes.NUMBER(10, 2),
    allowNull: false
  }
})

EntryDetail.belongsTo({
  model: Entry,
  foreignKey: 'asiento_id',
  allowNull: false
})

EntryDetail.belongsTo({
  model: Account,
  foreignKey: 'cuenta_id',
  allowNull: false
})

module.exports = EntryDetail
