const Alumno = require('../models/Alumno')

const createAlumno = async (req, res) => {
  try {
    const { nombre, codigo } = req.body
    const alumno = await Alumno.create({
      nombre,
      codigo
    })
    res.status(201).json(alumno)
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el alumno' })
  }
}

const getAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll({})
    res.status(200).json(alumnos)
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los alumnos' })
  }
}

module.exports = {
  createAlumno,
  getAlumnos
}
