const { Router } = require("express");
const router = Router();

const {
  createMensualidadAlumno,
  getMensualidadesAlumno,
  updateMensualidad,
  deleteMensualidad,
} = require("../controllers/mensualidad.controller.js");


router.get('/mensualidades/:id', getMensualidadesAlumno);
router.post('/mensualidades/:id', createMensualidadAlumno);
router.put('/mensualidades', updateMensualidad);
router.delete('/mensualidades', deleteMensualidad);

module.exports = router;