const { Router } = require("express");
const router = Router();

const {
  createMensualidadAlumno,
  getMensualidadesAlumno,
  getReporte
  // updateMensualidad,
  // deleteMensualidad,
} = require("../controllers/mensualidad.controller.js");


router.get('/:id', getMensualidadesAlumno);
router.post('/:id', createMensualidadAlumno);
router.get('/reporte/:grado', getReporte);
// router.put('/:id/mes/:mes', updateMensualidad);
// router.delete('/:id/mes/:mes', deleteMensualidad);

module.exports = router;