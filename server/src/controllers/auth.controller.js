const User = require('../models/User')
const bcrypt = require('bcrypt')
const { comparePassword, createToken } = require('../utils/utils')

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body
  try {
    const userFound = await User.getFindUserByEmail({ email })
    if (userFound) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hash = bcrypt.hashSync(password, 10)
    const user = await User.createUser({ name, email, password: hash, role })
    res.status(201).json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.getFindUserByEmail({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isMatch = comparePassword(password, user.password)
    if (isMatch) {
      const token = createToken(user)
      return res.status(200).json({ token })
    }
    res.status(400).json({ message: 'Invalid credentials' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

module.exports = {
  createUser,
  login,
  getAllUsers
}
