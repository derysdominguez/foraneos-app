const {
  createMensualidad,
  getMensualidades,
  getMensualidadesByAlumno
} = require('../controllers/mensualidad.controller')

const router = require('express').Router()

router.post('/', createMensualidad)
router.get('/', getMensualidades)
router.get('/:id', getMensualidadesByAlumno)

module.exports = router
