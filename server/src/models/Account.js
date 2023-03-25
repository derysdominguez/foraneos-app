const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Account = sequelize.define('cuenta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clasificacion: {
    type: 'clasificacion',
    allowNull: false
  },
  naturaleza: {
    type: 'naturaleza',
    allowNull: false
  },
  entrada: {
    type: 'entrada',
    allowNull: false
  },
  tipo_cuenta: {
    type: 'tipo_cuenta',
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = Account
