const router = require('express').Router();

const {createAlumno,getAlumnos,setAlumnoInactivo, getAlumnoById, getReporteBecadosPorGrado} = require('../controllers/alumno.controller');

router.get('/', getAlumnos);
router.get('/:id', getAlumnoById);
router.post('/', createAlumno);
router.put('/', setAlumnoInactivo);
router.get('/reporte/totalbecas', getReporteBecadosPorGrado);

module.exports = router;