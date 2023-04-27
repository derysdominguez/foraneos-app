const {Router} = require("express");
const router = Router();
const {getReporteRetirados, retirarAlumno, updateRetiro, deshacerRetiro} = require("../controllers/retiro.controller.js");


router.get('/reporte', getReporteRetirados );
router.post('/:id', retirarAlumno);
router.put('/:id', updateRetiro);
router.delete('/:id', deshacerRetiro);
module.exports = router;