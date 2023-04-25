const { getAlumnos, createAlumno } = require('../controllers/alumno.controller')
const router = require('express').Router()

router.get('/', getAlumnos)
router.post('/', createAlumno)

module.exports = router
