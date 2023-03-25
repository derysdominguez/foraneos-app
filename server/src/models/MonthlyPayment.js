const sequelize = require('../database/database')
const Student = require('./Student')
const Entry = require('./Entry')

const MonthlyPayment = sequelize.define('pago_mensual', {
  mes: {
    type: 'month_enum',
    allowNull: false
  }
})

MonthlyPayment.belongsTo({
  model: Student,
  as: 'alumno_id',
  foreignKey: { allowNull: false }
})

MonthlyPayment.belongsTo({
  model: Entry,
  as: 'asiento_id',
  foreignKey: { allowNull: false }
})

module.exports = MonthlyPayment
