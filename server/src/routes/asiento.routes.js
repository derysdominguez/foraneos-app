const { createAsiento, getAsientos } = require('../controllers/asiento.controller')
const router = require('express').Router()

router.get('/', getAsientos)
router.post('/', createAsiento)

module.exports = router
