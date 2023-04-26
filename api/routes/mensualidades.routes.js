const { Router } = require("express");
const router = Router();

const {
  createMensualidadAlumno,
  getMensualidadesAlumno,
  getReporteMensualidadesPorGrado,
  getReporteMorosos,
  getReporteAlumnosConPagoPerfecto,
  updateTodasMensualidades,
  // deleteMensualidad,
} = require("../controllers/mensualidad.controller.js");

router.get('/reporte/morosos', getReporteMorosos);
router.get('/reporte/pagoperfecto', getReporteAlumnosConPagoPerfecto);
router.get('/reporte/mensualidades/:grado', getReporteMensualidadesPorGrado);
router.get('/:id', getMensualidadesAlumno);
router.post('/:id', createMensualidadAlumno);
router.put('/:id', updateTodasMensualidades);

// router.put('/:id/mes/:mes', updateMensualidad);
// router.delete('/:id/mes/:mes', deleteMensualidad);

module.exports = router;