const express = require("express");
const app = express();
const asientoRoutes = require("./routes/asientos.routes.js");
const cuentaRoutes = require("./routes/cuentas.routes.js");

app.use(express.json())
app.use(asientoRoutes);
app.use(cuentaRoutes);

module.exports = app;