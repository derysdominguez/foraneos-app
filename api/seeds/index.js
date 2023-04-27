const {seedBeca} = require("./seedBeca.js");
const {seedAlumno} = require("./seedAlumno.js");
const {seedCuenta} = require("./seedCuentas.js");


module.exports.seedDatabase = async () => {
    await seedBeca();
    await seedAlumno();
    await seedCuenta();
};