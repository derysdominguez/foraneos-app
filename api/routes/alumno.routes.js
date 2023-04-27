const router = require('express').Router();

const {createAlumno,getAlumnos,setAlumnoInactivo, getAlumnoById,
    updateAlumno, deleteAlumno} = require('../controllers/alumno.controller');

router.get('/', getAlumnos);
router.get('/:id', getAlumnoById);
router.post('/', createAlumno);
router.put('/', setAlumnoInactivo);
router.put('/:id', updateAlumno);
router.delete('/:id', deleteAlumno);
module.exports = router;