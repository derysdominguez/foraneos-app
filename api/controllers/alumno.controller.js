const Alumno = require('../models/Alumno.js')
const Mensualidad = require('../models/Mensualidad.js')
const Beca = require('../models/Beca.js')

const grados = [
  'Kinder',
  'Preparatoria',
  'Primero',
  'Segundo',
  'Tercero',
  'Cuarto',
  'Quinto',
  'Sexto',
  'Septimo',
  'Octavo',
  'Noveno',
  'Decimo',
  'Undecimo'
]
const ordenDeMensualiadades = [
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio'
]


async function getAlumnos(req, res) {
  try {
    const alumnos = await Alumno.findAll({
        where : {
          activo : true
        },
        include: [
            {
                model: Beca,
                as: 'beca',
                attributes: ['tipo', 'pago']
            }
        ]
    })
    res.status(200).json(alumnos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function createAlumno(req, res) {
    const {codigo, nombre, grado, becaid} = req.body;
    try {
        const alumnoFound = await Alumno.findOne({ where: { codigo: codigo } });
        if (alumnoFound) {
  
        }
        const alumno = await Alumno.create({
            codigo,
            nombre,
            grado,
            becaid
        });

        ordenDeMensualiadades.forEach(async (mes) => {
            await Mensualidad.create({
                alumnoid : alumno.id,
                fecha_pago : null,
                mes
            });
        });


        
       res.status(201).json(alumno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function setAlumnoInactivo(req, res) {
  try {
    const { id, status } = req.query
    const alumno = await Alumno.findOne({ where: { id: id } })
    if (!alumno) {
      res.status(400).json({ message: 'El alumno no existe' })
    }
    alumno.activo = status
    await alumno.save()
    res.status(200).json(alumno)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function getAlumnoById(req, res) {
  const { id } = req.params
  try {
    const alumno = await Alumno.findOne({ where: { id: id } })
    if (!alumno) {
      res.status(400).json({ message: 'El alumno no existe' })
    }
    res.status(200).json(alumno)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteAlumno(req, res) {
  try {
    const {id} = req.params;
    await Alumno.destroy({
      where : {
        id
      }
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateAlumno(req, res) {
  try {
    const {id} = req.params;
    const {nombre, codigo, becaid, grado} = req.body;
    const alumno = await Alumno.findByPk(id);
    alumno.nombre = nombre;
    alumno.codigo = codigo;
    alumno.becaid = becaid;
    alumno.grado = grado;
    await alumno.save();
    res.json(alumno);
  } catch (error) {
    res.status(500).json({message : error.message});
  }
};

module.exports = {
  getAlumnos,
  createAlumno,
  setAlumnoInactivo,
  getAlumnoById,
  updateAlumno,
  deleteAlumno
}
