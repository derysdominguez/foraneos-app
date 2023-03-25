const sequelize = require('../database/database')
const Student = require('./Student')
const Entry = require('./Entry')

const MonthlyPayment = sequelize.define('pago_mensual', {
  mes: {
    type: 'month_enum',
    allowNull: false
  }
})

Student.hasMany(MonthlyPayment, {
  foreignKey: 'codigo_alumno',
  sourceKey: 'codigo'
})
MonthlyPayment.belongsTo(Student, {
  foreignKey: 'codigo_alumno',
  targetKey: 'codigo'
})

Entry.hasMany(MonthlyPayment, { foreignKey: 'asiento_id', sourceKey: 'id' })
MonthlyPayment.belongsTo(Entry, {
  foreignKey: 'asiento_id',
  targetKey: 'id'
})

module.exports = MonthlyPayment
