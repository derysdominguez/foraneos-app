const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Student = require('./Student')

const CanceledRegistration = sequelize.define('cancelacion_matricula', {
  fecha_cancelacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  monto: {
    type: DataTypes.NUMBER(10, 2),
    allowNull: false
  }
})

CanceledRegistration.belongsTo({
  model: Student,
  foreignKey: 'estudiante_id',
  allowNull: false
})

module.exports = CanceledRegistration
