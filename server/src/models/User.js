const db = require('../database/database')

const createUser = async ({ name, email, password }) => {
  try {
    const user = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    )
    return user.rows[0]
  } catch (error) {
    console.log(error)
  }
}

const getFindUserByEmail = async ({ email }) => {
  try {
    const userFound = await db.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    return userFound.rows[0]
  } catch (error) {
    console.log(error)
  }
}

const getUserById = async ({ id }) => {
  try {
    const userFound = await db.query('SELECT * FROM users WHERE id = $1', [id])
    return userFound.rows[0]
  } catch (error) {
    console.log(error)
  }
}

const getAllUsers = async () => {
  try {
    const users = await db.query('SELECT * FROM users')
    return users.rows
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser,
  getFindUserByEmail,
  getUserById,
  getAllUsers
}
