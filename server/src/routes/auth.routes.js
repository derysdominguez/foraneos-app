const {
  createUser,
  login,
  getAllUsers
} = require('../controllers/auth.controller')

const passport = require('passport')
const { Router } = require('express')
const router = Router()

router.post('/register', createUser)
router.post('/login', login)
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  getAllUsers
)

module.exports = router
