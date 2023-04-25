const express = require("express");
const app = express();
const asientoRoutes = require("./routes/asientos.routes.js");
const cuentaRoutes = require("./routes/cuentas.routes.js");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Aquí especifica el dominio permitido
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json())
app.use(asientoRoutes);
app.use(cuentaRoutes);

module.exports = app;