const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Student = sequelize.define('alumno', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  grado: {
    type: 'grado',
    allowNull: false
  },
  beca: {
    type: DataTypes.INTEGER
  }
})

module.exports = Student
