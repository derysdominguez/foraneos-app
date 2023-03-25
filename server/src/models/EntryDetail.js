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
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false
  }
}, {
  timestamps: false
})

Entry.hasMany(EntryDetail, {
  foreignKey: 'asiento_id',
  sourceKey: 'id'
})
EntryDetail.belongsTo(Entry, {
  foreignKey: 'asiento_id',
  targetKey: 'id'
})

Account.hasMany(EntryDetail, {
  foreignKey: 'cuenta_id',
  sourceKey: 'id'
})
EntryDetail.belongsTo(Account, {
  foreignKey: 'cuenta_id',
  targetKey: 'id'
})

module.exports = EntryDetail
