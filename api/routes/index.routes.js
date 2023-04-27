
const router = require('express').Router();
const alumnoRoutes = require('./alumno.routes');
const asientoRoutes = require('./asientos.routes.js');
const cuentaRoutes = require('./cuentas.routes.js');
const mensualidadRoutes = require('./mensualidades.routes.js');
const deudaRoutes = require('./deudas.routes.js');
const retiroRoutes = require('./retiro.routes.js');
const reporteRoutes = require('./reportes.routes');

router.use('/asientos', asientoRoutes);
router.use('/cuentas', cuentaRoutes);
router.use('/alumnos', alumnoRoutes);
router.use('/mensualidades', mensualidadRoutes);
router.use('/deudas', deudaRoutes);
router.use('/retiros', retiroRoutes);
router.use('/reportes', reporteRoutes);

module.exports = router;

