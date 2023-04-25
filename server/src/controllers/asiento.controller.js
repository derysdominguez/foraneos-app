const Asiento = require('../models/Asiento')
const AsientoDetalle = require('../models/AsientoDetalle')
// const Cuenta = require('../models/Cuenta')

const createAsiento = async (req, res) => {
  try {
    const { descripcion, naturaleza, monto, cuenta } = req.body
    const asiento = await Asiento.create({
      descripcion
    })
    const asientoDetalle = await AsientoDetalle.create({
      naturaleza,
      monto,
      cuenta_id: cuenta,
      asiento_id: asiento.id
    })
    res.status(201).json({ asiento, asientoDetalle })
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el asiento' })
  }
}

const getAsientos = async (req, res) => {
  try {
    const asientos = await Asiento.findAll({})
    res.status(200).json(asientos)
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los asientos' })
  }
}

module.exports = {
  createAsiento,
  getAsientos
}
