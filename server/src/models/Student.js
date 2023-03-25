const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Scholarship = require('./Scholarship')

const Student = sequelize.define(
  'alumno',
  {
    codigo: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: false
  }
)

Scholarship.hasMany(Student, { foreignKey: 'codigo_beca', sourceKey: 'id' })
Student.belongsTo(Scholarship, {
  foreignKey: 'codigo_beca',
  targetKey: 'id'
})

module.exports = Student
