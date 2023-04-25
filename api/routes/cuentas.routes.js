const {Router} = require("express");
const router = Router();
const {getCuentas, createCuenta} = require("../controllers/cuentas.controller.js");

router.get('/cuentas', getCuentas);
router.post('/cuentas', createCuenta);
router.put('/cuentas/:id');
router.delete('/cuentas/:id');
router.get('/cuentas/:id');

module.exports = router;