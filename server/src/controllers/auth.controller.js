const { createToken, comparePassword } = require('../utils/utils')
const User = require('../models/User')

async function createUser (req, res) {
  const { username, email, password, role } = req.body
  try {
    const userFound = await User.findOne({
      where: {
        email
      }
    })
    if (userFound) return res.status(400).json({ msg: 'User already exists' })

    const user = await User.create({
      username,
      email,
      password,
      role
    })
    if (user) {
      return res.json({
        message: 'User created successfully',
        data: user
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

async function login (req, res) {
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({
      where: {
        email
      }
    })
    if (!userFound) return res.status(400).json({ msg: 'User not found' })

    const matchPassword = comparePassword(password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, msg: 'Invalid password' })

    const token = createToken(userFound)

    res.status(200).json({ token })
  } catch (e) {
    res.status(500).json({ msg: 'Something goes wrong' })
  }
}

module.exports = {
  createUser,
  login
}
