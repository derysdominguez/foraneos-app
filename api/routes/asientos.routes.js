const {Router} = require("express");
const router = Router();
const {getAsientos, createAsiento} = require("../controllers/asientos.controller.js");

router.get('/', getAsientos);
router.post('/', createAsiento);
// router.put('/:id');
// router.delete('/:id');
// router.get('/:id');

module.exports = router;