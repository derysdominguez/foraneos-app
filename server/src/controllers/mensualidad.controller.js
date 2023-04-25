const Mensualidad = require('../models/Mensualidad')
const Asiento = require('../models/Asiento')
const AsientoDetalle = require('../models/AsientoDetalle')

const createMensualidad = async (req, res) => {
  try {
    const { descripcion, monto, naturaleza, cuenta, alumno, mes, anio } =
      req.body
    const asiento = await Asiento.create({
      descripcion
    })
    const asientoDetalle = await AsientoDetalle.create({
      naturaleza,
      monto,
      cuenta_id: cuenta,
      asiento_id: asiento.id
    })
    const mensualidad = await Mensualidad.create({
      mes,
      anio,
      alumno_id: alumno,
      asiento_id: asiento.id
    })
    res.status(201).json(mensualidad, asiento, asientoDetalle)
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la mensualidad' })
  }
}

const getMensualidades = async (req, res) => {
  try {
    const mensualidades = await Mensualidad.findAll({})
    res.status(200).json(mensualidades)
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las mensualidades' })
  }
}

const getMensualidadesByAlumno = async (req, res) => {
  try {
    const mensualidades = await Mensualidad.findAll({
      where: { alumno_id: req.params.id }
    })
    res.status(200).json(mensualidades)
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las mensualidades' })
  }
}

module.exports = {
  createMensualidad,
  getMensualidades,
  getMensualidadesByAlumno
}
