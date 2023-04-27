const {seedBeca} = require("./seedBeca.js");
const {seedAlumno} = require("./seedAlumno.js");


module.exports.seedDatabase = async () => {
    await seedBeca();
    await seedAlumno();
};