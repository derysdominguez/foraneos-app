const asientoRoutes = require('./asientos.routes');
const cuentaRoutes = require('./cuentas.routes');
const router = require('express').Router();

router.use('/asientos', asientoRoutes);
router.use('/cuentas', cuentaRoutes);

module.exports = router;

