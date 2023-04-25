const {Router} = require("express");
const router = Router();
const {getCuentas, createCuenta, updateCuenta, deleteCuenta, getCuenta} = require("../controllers/cuentas.controller.js");

router.get('/cuentas', getCuentas);
router.post('/cuentas', createCuenta);
router.put('/cuentas/:id', updateCuenta);
router.delete('/cuentas/:id', deleteCuenta);
router.get('/cuentas/:id', getCuenta);

module.exports = router;