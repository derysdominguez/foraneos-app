const {Router} = require('express');
const router = Router();

const {getDeudas, createDeuda, updateDeuda, deleteDeuda } = require("../controllers/deudas.controller.js");

router.get('/', getDeudas);
router.post('/', createDeuda);
router.put('/:id', updateDeuda );
router.delete('/:id', deleteDeuda);

module.exports = router;