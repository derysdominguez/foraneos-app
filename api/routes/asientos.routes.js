const {Router} = require("express");
const router = Router();
const {getAsientos, createAsiento} = require("../controllers/asientos.controller.js");

router.get('/asientos', getAsientos);
router.post('/asientos', createAsiento);
router.put('/asientos/:id');
router.delete('/asientos/:id');
router.get('/asientos/:id');

module.exports = router;