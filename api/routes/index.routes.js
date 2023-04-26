const asientoRoutes = require('./asientos.routes');
const cuentaRoutes = require('./cuentas.routes');
const router = require('express').Router();
const alumnoRoutes = require('./alumno.routes');

router.use('/asientos', asientoRoutes);
router.use('/cuentas', cuentaRoutes);
router.use('/alumnos', alumnoRoutes);

module.exports = router;

