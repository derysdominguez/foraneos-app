const {Router} = require("express");
const router = Router();
const {getAsientos, createAsiento, deleteAsiento, updateAsiento} = require("../controllers/asientos.controller.js");

router.get('/', getAsientos);
router.post('/', createAsiento);
router.put('/:id', updateAsiento);
router.delete('/:id', deleteAsiento);
// router.get('/:id');

module.exports = router;