const app = require("./app.js");
const sequelize = require("./database/database.js");
const port = 4000;
async function main() {
    try {
        
        await sequelize.sync({force:true});
        console.log("Conexión exitosa");
        app.listen(port);
        console.log("Server is listening on port", port)
    } catch (error) {
        console.log("No se pudo :(", error);
    }
}

main();