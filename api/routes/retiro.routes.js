const {Router} = require("express");
const router = Router();
const {getReporteRetirados} = require("../controllers/retiro.controller.js");

router.get('/reporte', getReporteRetirados );

module.exports = router;