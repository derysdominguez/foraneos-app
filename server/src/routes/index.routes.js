const { Router } = require('express')
const authRoutes = require('./auth.routes')
const asientoRoutes = require('./asiento.routes')
const alumnoRoutes = require('./alumno.routes')
const mensualidadRoutes = require('./mensualidad.routes')

const router = Router()

router.use('/auth', authRoutes)
router.use('/asiento', asientoRoutes)
router.use('/alumno', alumnoRoutes)
router.use('/mensualidad', mensualidadRoutes)
// router.use('/reports', reportsRoutes)

module.exports = router
