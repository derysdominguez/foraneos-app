const { Router } = require('express')
const authRoutes = require('./auth.routes')
const reportsRoutes = require('./reports.routes')

const router = Router()

router.use('/auth', authRoutes)
router.use('/reports', reportsRoutes)

module.exports = router
