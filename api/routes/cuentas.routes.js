const {Router} = require("express");
const router = Router();
const {getCuentas, createCuenta, updateCuenta, deleteCuenta, getCuenta} = require("../controllers/cuentas.controller.js");

router.get('/', getCuentas);
router.post('/', createCuenta);
router.put('/:id', updateCuenta);
router.delete('/:id', deleteCuenta);
router.get('/:id', getCuenta);

module.exports = router;