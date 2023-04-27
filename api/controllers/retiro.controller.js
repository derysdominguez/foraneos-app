const Retiro = require("../models/Retiro.js");
const Alumno = require("../models/Alumno.js");

const grados = ["Kinder", "Preparatoria", "Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Septimo", "Octavo", "Noveno", "Decimo", "Undecimo"];

module.exports.getReporteRetirados = async (req, res) => {
   try {
    const alumnosRetirados = await Retiro.findAll({
        include : {
           model : Alumno,
           attributes : ["nombre", "codigo", "grado"]
        }
    });
    const alumnosFormateados = alumnosRetirados.map(alumnoRetirado => {
        const {descripcion, fecha_retiro, alumno} = alumnoRetirado; 
        return {
            nombre : alumno.nombre,
            codigo : alumno.codigo,
            fecha : fecha_retiro,
            grado : grados[alumno.grado - 1],
            motivo : descripcion
        }
    });
    res.json(alumnosFormateados);
   } catch (error) {
    res.status(500).json({message : error.message});
   }
};