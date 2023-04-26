
const sequelize = require("./database/database.js");
const Beca = require("./models/Beca.js");
const Alumno = require("./models/Alumno.js");
const Asiento = require("./models/Asiento.js");
const AsientoDetalle = require("./models/AsientoDetalle.js");
const Cuenta = require("./models/Cuenta.js");

const app = require("./app.js");
require("dotenv").config();

const port = process.env.PORT;
async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force:false});
        console.log("Conexión exitosa");
        app.listen(port);
        console.log("Server is listening on port", port);
    } catch (error) {
        console.log("No se pudo :(", error);
    }
}

main();