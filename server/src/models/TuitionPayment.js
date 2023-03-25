const sequelize = require('../database/database')
const Student = require('./Student')
const Entry = require('./Entry')

const TuitionPayment = sequelize.define('pago_matricula', {})

TuitionPayment.belongsTo({
  model: Student,
  as: 'alumno_id',
  foreignKey: { allowNull: false }
})
TuitionPayment.belongsTo({
  model: Entry,
  as: 'asiento_id',
  foreignKey: { allowNull: false }
})

module.exports = TuitionPayment
