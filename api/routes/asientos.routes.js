const {Router} = require("express");
const router = Router();
const {getAsientos, createAsiento, getReporteIngesosEgresos, deleteAsiento} = require("../controllers/asientos.controller.js");

router.get('/', getAsientos);
router.post('/', createAsiento);
router.get('/reporte/ingresos/:mes', getReporteIngesosEgresos);
// router.put('/:id');
router.delete('/:id', deleteAsiento);
// router.get('/:id');

module.exports = router;