const Cuenta = require("../models/Cuenta.js");

module.exports.getCuentas = async (req, res) => {
    try {
        const cuentas = await Cuenta.findAll();
        res.json(cuentas);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
};

module.exports.createCuenta = async (req, res) => {
  try {
    const { codigo, nombre, clasificacion } = req.body;
    const newCuenta = await Cuenta.create({
        codigo,
        nombre,
        clasificacion
    });

    res.json(newCuenta);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
};
