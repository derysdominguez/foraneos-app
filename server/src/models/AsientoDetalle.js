const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Asiento = require('./Asiento')
const Cuenta = require('./Cuenta')

const AsientoDetalle = sequelize.define(
  'asiento_detalle',
  {
    naturaleza: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

AsientoDetalle.belongsTo(Asiento, {
  foreignKey: 'asiento_id',
  primaryKey: true
})
AsientoDetalle.belongsTo(Cuenta, { foreignKey: 'cuenta_id', primaryKey: true })

module.exports = AsientoDetalle
