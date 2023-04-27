const sequelize = require("./database/database.js");
const Beca = require("./models/Beca.js");
const Alumno = require("./models/Alumno.js");
const Asiento = require("./models/Asiento.js");
const AsientoDetalle = require("./models/AsientoDetalle.js");
const Cuenta = require("./models/Cuenta.js");
const Mensualidad = require("./models/Mensualidad.js");
const Deuda = require("./models/Deuda.js");
const Retiro = require("./models/Retiro.js");
const { seedDatabase } = require("./seeds/index.js");

const app = require("./app.js");
require("dotenv").config();

const port = process.env.DB_PORT;

async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force : true});
        console.log("Conexión exitosa");
        seedDatabase();
        app.listen(port);
        console.log("Server is listening on port", port);
    } catch (error) {
        console.log("No se pudo :(", error);
    }
}

main();
