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

module.exports.retirarAlumno = async (req, res) => {
    try {
        const {id} = req.params;
        const {descripcion, fecha_retirado} = req.body;
        const alumnoRetirado = await Alumno.findByPk(id);
        if (!alumnoRetirado) {
            throw new Error("El alumno no ha sido encontrado.");     
        }
        const retiro = await Retiro.create({
            alumnoid : id,
            descripcion,
            fecha_retirado
        });
        alumnoRetirado.activo = false;
        alumnoRetirado.save();
        res.json(retiro);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

module.exports.deshacerRetiro = async (req, res) => {
    try {
        const {id} = req.params;
        const alumnoActivo = await Alumno.findByPk(id);
        alumnoActivo.activo = true;
        await alumnoActivo.save();
        await Retiro.destroy({
            where : {
                alumnoid :  id
            }
        });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

module.exports.updateRetiro = async (req, res) => {
    try {
        const {id} = req.params;
        const {descripcion, fecha_retiro} = req.body;
        const retiro = await Retiro.findByPk(id);
        if (!retiro) {
            throw new Error("Ese alumno no ha sido retirado");
        }
        retiro.descripcion = descripcion;
        retiro.fecha_retiro = fecha_retiro;
        await retiro.save();
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};