const { createUser, login } = require('../controllers/auth.controller')

const { Router } = require('express')
const router = Router()

router.post('/register', createUser)
router.post('/login', login)

module.exports = router
