const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Scholarship = sequelize.define('beca', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  monto: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false
  }
},
{
  timestamps: false
})

module.exports = Scholarship