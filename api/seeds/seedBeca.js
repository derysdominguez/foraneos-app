const Beca = require("../models/Beca");

module.exports.seedBeca = async () => {
    try {
        await Beca.create({
            tipo : "Beca completa",
            pago : 1325
        });
        await Beca.create({
            tipo : "Media beca",
            pago : 662.5
        });
        await Beca.create({
            tipo : "Sin beca",
            pago : 95
        });
    } catch (error) {
        console.log("Error al crear alumno", error.message);
    }
};