const Mensualidad = require("../models/Mensualidad.js");
const Alumno = require("../models/Alumno.js");

const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

module.exports.getMensualidadesAlumno = async (req, res) => {
    try {
        const {id} = req.params;
        const mensualidadesAlumno = await Mensualidad.findAll({
            where: {
                alumnoid : id
            }
        });
        res.json(mensualidadesAlumno);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
};

module.exports.createMensualidadAlumno = async (req, res) => {
    try {
        const {id : alumnoid} = req.params;
        const {fecha_pago, mes} = req.body;
        const alumnoId = await Alumno.findByPk(alumnoid);
        if (alumnoId) {
            const newMensualidad = await Mensualidad.create({
                alumnoid,
                mes : meses[mes - 1],
                fecha_pago
            });
            res.json(newMensualidad);
        } else {
            throw new Error ("No existe ese alumno.");
        }
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
};

module.exports.updateMensualidad = () => {

};

module.exports.deleteMensualidad = () => {

};