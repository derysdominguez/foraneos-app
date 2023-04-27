const router = require('express').Router();

const {createAlumno,getAlumnos,setAlumnoInactivo, getAlumnoById} = require('../controllers/alumno.controller');

router.get('/', getAlumnos);
router.get('/:id', getAlumnoById);
router.post('/', createAlumno);
router.put('/', setAlumnoInactivo);
module.exports = router;