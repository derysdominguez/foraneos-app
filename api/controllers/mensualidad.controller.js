const Mensualidad = require("../models/Mensualidad.js");
const Alumno = require("../models/Alumno.js");

const moment = require("moment");

const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const ordenDeMensualiadades = [
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
];



const grados = ["Kinder", "Preparatoria", "Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Septimo", "Octavo", "Noveno", "Decimo", "Undecimo"];

const diaDePago = 15;

const fechasDondePagan = ordenDeMensualiadades.map(mes => {
  const anio = ["septiembre", "octubre", "noviembre", "diciembre"].includes(mes) ? 2022 : 2023
  return moment([anio, meses.indexOf(mes) + 1, diaDePago]).format('YYYY-MM-DD');
}); 

module.exports.getMensualidadesAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const mensualidadesAlumno = await Mensualidad.findAll({
      where: {
        alumnoid: id,
      },
    });
    res.json(mensualidadesAlumno);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.createMensualidadAlumno = async (req, res) => {
  try {
    const { id: alumnoid } = req.params;
    const { fecha_pago, mes } = req.body;
    const alumnoId = await Alumno.findByPk(alumnoid);
    if (alumnoId) {
      const newMensualidad = await Mensualidad.create({
        alumnoid,
        mes: meses[mes - 1],
        fecha_pago,
      });
      if (newMensualidad.fecha_pago > fechasDondePagan[ordenDeMensualiadades.indexOf(newMensualidad.mes)]) {
        alumnoId.pago_perfecto = false;
        await alumnoId.save();
      }
      res.json(newMensualidad);
    } else {
      throw new Error("No existe ese alumno.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports.updateTodasMensualidades = async (req, res) => {
  try {
    const { id: alumnoid } = req.params;
    const alumno = await Alumno.findByPk(alumnoid);
    if (alumno) {
      const mensualidades = req.body;
      mensualidades.sort(a,b => {
        return ordenDeMensualiadades.indexOf(a.mes) < ordenDeMensualiadades.indexOf(b.mes);
      });
      let tieneMensualidadPreviaNoPagada = false;
      mensualidades.forEach(async mensualidad => {
        const {mes, fecha_pago} = mensualidad;
        const updatedMensualidad = await Mensualidad.findOne({
          where : {
            mes : mes,
            alumnoid : alumnoid
          }
        });

        if (fecha_pago && tieneMensualidadPreviaNoPagada) {
          throw new Error("No puede ingresar un pago de una mensualidad futura cuando hay cuotas anteriores no canceladas.");
        }

        if (updatedMensualidad) {
          updatedMensualidad.fecha_pago = fecha_pago;
          if (!fecha_pago) {
            tieneMensualidadPreviaNoPagada = true;
          }
          if (updatedMensualidad.fecha_pago && updatedMensualidad.fecha_pago > fechasDondePagan[ordenDeMensualiadades.indexOf(updatedMensualidad.mes)]) {
            alumno.pago_perfecto = false;
            await alumno.save();
          }
          await updatedMensualidad.save();
        } else {
          const mensualidadCreada = await Mensualidad.create({
            alumnoid,
            mes,
            fecha_pago
          });
          
        }

        
      });
      res.sendStatus(204);
    } else {
      throw new Error("No existe ese alumno.");
    }
  } catch (error) {
    res.status(500).json({message : error.message});
  }
};

module.exports.deleteMensualidad = () => {};
