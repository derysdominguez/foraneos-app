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
      res.json(newMensualidad);
    } else {
      throw new Error("No existe ese alumno.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getReporteMensualidadesPorGrado = async (req, res) => {
  try {
    const { grado } = req.params;
    const alumnos = await Alumno.findAll({
      attributes: ["id", "nombre", "codigo"],
      where: {
        grado: grado,
      },
    });
    let mensualidadesDelGrado = [];
    alumnos.forEach(async (alumno) => {
      const { id, nombre, codigo } = alumno;
      const mensualidadesPagadas = await Mensualidad.findAll({
        where: {
          alumnodid: id,
        },
        order : [["orden", "ASC"]]
      });
      if (!mensualidadesPagadas) {
        res.send({
          nombre,
          codigo,
          septiembre: "",
          octubre: "",
          noviembre: "",
          diciembre: "",
          enero: "",
          febrero: "",
          marzo: "",
          abril: "",
          mayo: "",
          junio: "",
        });
      }
      
      let mensualidadesAlumno =  {nombre, codigo};
      let tieneHasta;
      mensualidadesPagadas.forEach((mensualidadPagada, index) => {
        mensualidadesAlumno[mensualidadPagada.mes] = moment(mensualidadPagada.fecha_pago).format('DD/MM');
        tieneHasta = index;
      });
      
      if (tieneHasta < 9) {
        ordenDeMensualiadades.slice(tieneHasta + 1).forEach(mensualidadNoPagada => {
            mensualidadesAlumno[mensualidadNoPagada] = "";
        });
      }

      mensualidadesDelGrado.push(mensualidadesAlumno)
    });
    res.json(mensualidadesDelGrado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getReporteMorosos = async (req, res) => {
  try {
    const fechaActual = moment();
    const mesMorosoAsString = fechaActual.date() < diaDePago + 1 ? fechaActual.subtract(1, 'month').format('M') : fechaActual.format('M');
    const mesMoroso = parseInt(mesMorosoAsString); 
    const morososPorGrado = [];
    for (let grado = 1; grado <= 13; i++){
      const alumnos = await Alumno.findAll({
        attributes: ["id"],
        where: {
          grado: grado,
        },
      });
      let morosos = 0;
      if (alumnos) {
        alumnos.forEach(async alumno => {
          const mensualidad = await Mensualidad.findOne({
            where : {
              where : {
                alumnoid : alumno.id,
                mes : meses[mesMoroso - 1]
              }
            }
          });
          if (!mensualidad || moment(mensualidad.fecha_pago).date() > diaDePago ) {
            morosos++;
          }
        });
      }
      morososPorGrado.push({nombre : grados[grado] , cantidad : morosos});
    }
    res.json(morososPorGrado);
  } catch {
    res.status(500).json({message : error.message});
  }
};

module.exports.getReporteAlumnosConPagoPerfecto = async (req, res) => {

};

module.exports.updateMensualidad = () => {};

module.exports.deleteMensualidad = () => {};
