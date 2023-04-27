const Alumno = require("../models/Alumno.js");
const Asiento = require("../models/Asiento.js");
const AsientoDetalle = require("../models/AsientoDetalle.js");
const Cuenta = require("../models/Cuenta.js");
const Mensualidad = require("../models/Mensualidad.js");
const moment = require("moment");
const {Op} = require("sequelize");

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

module.exports.getReporteIngresosEgresosPorMes = async (req, res) => {
    try {
      const asientos = await Asiento.findAll({
        include: {
          // where : Sequelize.literal(`EXTRACT(MONTH FROM fecha_asiento) = ${mes}`),
          model: AsientoDetalle,
          attributes: { exclude: ["asientoid", "cuentaid"] },
          include: {
            model: Cuenta,
            as: "cuenta",
          },
        },
      });
  
      const asientosFormateados = [];
      if (asientos) {
        asientos.forEach((asiento) => {
          const { fecha_asiento, descripcion, asientodetalles } = asiento;
          asientodetalles.forEach((renglonAsiento) => {
            if (renglonAsiento.dataValues.cuenta.dataValues.clasificacion === "ingreso") {
              asientosFormateados.push({
                fecha: fecha_asiento,
                cuenta: renglonAsiento.dataValues.cuenta.dataValues.nombre,
                descripcion,
                monto: renglonAsiento.dataValues.cuenta.dataValues.monto,
                entrada: "i",
              });
            }
            if (
              ["gasto-admin", "gasto-ventas"].includes(
                renglonAsiento.dataValues.cuenta.dataValues.clasificacion
              )
            ) {
              asientosFormateados.push({
                fecha: fecha_asiento,
                cuenta: renglonAsiento.dataValues.cuenta.dataValues.nombre,
                descripcion,
                monto: renglonAsiento.dataValues.cuenta.dataValues.monto,
                entrada: "e",
              });
            }
          });
        });
      } else{
        res.json({estado : "Sin datos."})
      }
  
      res.json(asientosFormateados);
    } catch (error) {
      res.status(500).json({ message: error.stack });
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
      const mesMoroso = parseInt(fechaActual.date() < diaDePago + 1 ? fechaActual.subtract(1, 'month').format('M') : fechaActual.format('M')); 
      const morososPorGrado = [];
      for (let grado = 1; grado <= 13; grado++){
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


  module.exports.getReporteEstadisticasBecas = async (req, res) => {
    try {
      const alumnosBecadosPorGrado = []
      for (let grado = 1; grado <= 13; grado++) {
        const alumnos = await Alumno.findAll({
          where: {
            grado: grado
          }
        });

        let completa = 0
        let media_beca = 0
        let sin_beca = 0
        alumnos.forEach((alumno) => {
          const { becaid } = alumno;
          if (becaid === 1) completa++;
          if (becaid === 2) media_beca++;
          if (becaid === 3) sin_beca++;
        })
        alumnosBecadosPorGrado.push({
          grado: grados[grado - 1],
          completa,
          media_beca,
          sin_beca
        })
      }
      res.json(alumnosBecadosPorGrado)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  };

  module.exports.getReporteGananciasPorMes = async (req, res) => {
    try {
      console.log("Recopilando reporte");
      cuentasIngresos = await Cuenta.findAll({
        attributes : ["codigo"],
        where : {  
          clasificacion : "ingreso"
        }
      });
      cuentasGastos = await Cuenta.findAll({
        attributes : ["codigo"],
        where : {
          clasificacion : {
            [Op.in] : ["gasto-admin", "gasto-ventas"]
          }
        }
      });
      console.log(cuentasIngresos);

      codigosCuentasIngresos = cuentasIngresos.map(objeto => objeto.codigo);
      codigosCuentasGastos = cuentasGastos.map(objeto => objeto.codigo);
      console.log(codigosCuentasGastos);
      console.log(codigosCuentasIngresos);

      const gananciasNetasPorMes = [];
      for (let mes = 0; mes <= 11; mes++ ) {
        const anioActual = moment().year();
        const inicioMes = moment().year(anioActual).month(0).startOf('month').format("YYYY-MM-DD");
        const finMes = moment().year(anioActual).month(0).endOf('month').format("YYYY-MM-DD");
        const asientosDelMes = await Asiento.findAll({
          attributes : ["codigo"],
          where : {
            fecha_asiento : {
              [Op.between] : [inicioMes, finMes]
              }
            }
          });
        const idsAsientosMes = asientosDelMes.map(objeto => objeto.codigo);
        const ingresos = await AsientoDetalle.sum("monto", {
          where : {
            asientoid : {[Op.in] : idsAsientosMes},
            cuentaid : {[Op.in] : codigosCuentasIngresos},
            lado : "h"
          }
        });
        const gastos = await AsientoDetalle.sum("monto", {
          where : {
            asientoid : {[Op.in] : idsAsientosMes},
            cuentaid : {[Op.in] : codigosCuentasGastos},
            lado : "d"
          }
        });
        const gananciasMes = ingresos - gastos;
        gananciasNetasPorMes.push({
          mes : meses[mes].charAt(0).toUpperCase() + meses[mes].slice(1),
          ingresos : ingresos ? ingresos : 0,
          gastos : gastos ? gastos : 0,
          ganancias : gananciasMes
        });
      }
      res.json(gananciasNetasPorMes);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }