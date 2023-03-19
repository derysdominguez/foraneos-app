const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

function createToken (user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30m' // 24 hours
  })
}

function comparePassword (password, hash) {
  return bcrypt.compareSync(password, hash)
}
module.exports = {
  createToken,
  comparePassword
}
