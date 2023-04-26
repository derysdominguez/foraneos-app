
const router = require('express').Router();
const alumnoRoutes = require('./alumno.routes');
const asientoRoutes = require('./asientos.routes.js');
const cuentaRoutes = require('./cuentas.routes.js');
const mensualidadRoutes = require('./mensualidades.routes.js');
const deudaRoutes = require('./deudas.routes.js');

router.use('/asientos', asientoRoutes);
router.use('/cuentas', cuentaRoutes);
router.use('/alumnos', alumnoRoutes);
router.use('/mensualidades', mensualidadRoutes);
router.use('/deudas', deudaRoutes);

module.exports = router;

