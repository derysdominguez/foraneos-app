const app = require("./app.js");
const sequelize = require("./database/database.js");
require("dotenv").config();

const Beca = require("./models/Beca.js");
const Alumno = require("./models/Alumno.js");
const Asiento = require("./models/Asiento.js");
const AsientoDetalle = require("./models/AsientoDetalle.js");
const Cuenta = require("./models/Cuenta.js");


const port = process.env.DB_PORT;
async function main() {
    try {
        console.log(sequelize.models);
        await sequelize.sync({force:true});
        console.log("Conexión exitosa");
        app.listen(port);
        console.log("Server is listening on port", port)
    } catch (error) {
        console.log("No se pudo :(", error);
    }
}

main();