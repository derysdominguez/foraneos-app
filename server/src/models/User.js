const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const bcrypt = require('bcrypt')

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

User.beforeCreate((user, options) => {
  user.password = bcrypt.hashSync(user.password, 10)
})
User.create({
  username: 'admin',
  email: 'admin@admin.com',
  password: 'admin',
  role: 'admin',
  createdAt: new Date()
}).then((user) => {
  console.log(user)
})

module.exports = User
