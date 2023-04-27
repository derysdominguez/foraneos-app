const {Router} = require("express");
const router = Router();
const {getReporteIngresosEgresosPorMes, getReporteMorosos,
    getReporteAlumnosConPagoPerfecto, getReporteMensualidadesPorGrado,
    getReporteEstadisticasBecas, getReporteGananciasPorMes} =  require("../controllers/reportes.controller.js");

router.get('/flujos/:mes', getReporteIngresosEgresosPorMes); // reporte 1
router.get('/mensualidades/:grado', getReporteMensualidadesPorGrado); // reporte 4
router.get('/ganancias', getReporteGananciasPorMes); // reporte 5
router.get('/becas', getReporteEstadisticasBecas) // reporte 6
router.get('/morosos', getReporteMorosos); // reporte 7
router.get('/pagoperfecto', getReporteAlumnosConPagoPerfecto); // reporte 8

module.exports = router;