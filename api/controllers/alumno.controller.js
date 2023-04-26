const Alumno = require('../models/Alumno');

const grados = ["Kinder", "Preparatoria", "Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto", "Septimo", "Octavo", "Noveno", "Decimo", "Undecimo"];

async function getAlumnos(req, res) {
    try {
        const alumnos = await Alumno.findAll();
        res.status(200).json(alumnos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createAlumno(req, res) {
    const {codigo, nombre, grado, becaId} = req.body;
    try {
        const alumnoFound = await Alumno.findOne({ where: { codigo: codigo } });
        if (alumnoFound) {
            res.status(400).json({ message: "El alumno ya existe" });
        }
        const alumno = await Alumno.create({
            codigo,
            nombre,
            grado,
            becaid: becaId
        })
       res.status(201).json(alumno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

async function setAlumnoInactivo (req, res) {
    try {
        const {id, status} = req.query;
        const alumno = await Alumno.findOne({ where: { id: id } });
        if (!alumno) {
            res.status(400).json({ message: "El alumno no existe" });
        }
        alumno.activo = status;
        await alumno.save();
        res.status(200).json(alumno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAlumnoById (req, res) {
    const {id} = req.params;
    try {
        const alumno = await Alumno.findOne({ where: { id: id } });
        if (!alumno) {
            res.status(400).json({ message: "El alumno no existe" });
        }
        res.status(200).json(alumno);        

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getReporteBecadosPorGrado (req, res) {
    try {
        const alumnosBecadosPorGrado = [];
        for (let grado = 1; grado <= 13; i++) {
            const alumnos = await Alumno.findAll({
                attributes: ["id"],
                where: {
                  grado: grado,
                },
            });
            let completa = 0; let media_beca = 0; let sin_beca = 0;
            alumnos.forEach((alumno) => {
                const {becaid} = alumno;
                if (becaid === 1) completa++;
                if (becaid === 2) media_beca++;
                if (becaid === 3) sin_beca++;
            });
            alumnosBecadosPorGrado.push({
                grado : grados[grado - 1],
                completa,
                media_beca,
                sin_beca
            });
        }
        res.json(alumnosBecadosPorGrado);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAlumnos,
    createAlumno,
    setAlumnoInactivo,
    getAlumnoById,
    getReporteBecadosPorGrado
}
