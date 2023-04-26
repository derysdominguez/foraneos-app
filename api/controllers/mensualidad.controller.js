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
  } catch (error) {
    res.status(500).json({message : error.message});
  }
};

module.exports.getReporteAlumnosConPagoPerfecto = async (req, res) => {
  try {
    const alumnosConPagoPerfecto = await Alumno.findAll({
      attributes : ["nombre", "codigo", "grado", "becaid"],
      where : {
        pago_perfecto : true
      }, 
    });
    const becas = ["Beca completa", "Media beca", "Sin beca"];
    const alumnosConFormato = [];
    alumnosConPagoPerfecto.forEach(alumno => {
      const {nombre, codigo, grado, becaid} = alumno; 
      alumnosConFormato.push({
        nombre,
        codigo,
        grado : grados[grado - 1],
        tipo_beca : becas[becaid - 1]
      });
    });
    res.json(alumnosConFormato);
  } catch (error) {
    res.status(500).json({message : error.message});
  }
};

module.exports.updateTodasMensualidades = async (req, res) => {
  try {
    const { id: alumnoid } = req.params;
    const alumno = await Alumno.findByPk(alumnoid);
    if (alumno) {
      const mensualidades = req.body;
      mensualidades.forEach(async mensualidad => {
        const {mes, fecha_pago} = mensualidad;
        const updatedMensualidad = await Mensualidad.findOne({
          where : {
            mes : mes,
            alumnoid : alumnoid
          }
        });
        updatedMensualidad.fecha_pago = fecha_pago;
        if (updatedMensualidad.fecha_pago && updatedMensualidad.fecha_pago > fechasDondePagan[ordenDeMensualiadades.indexOf(updatedMensualidad.mes)]) {
          alumno.pago_perfecto = false;
          await alumno.save();
        }
        await updatedMensualidad.save();
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
