const Cuenta = require("../models/Cuenta.js");

module.exports.getCuentas = async (req, res) => {
    try {
        const cuentas = await Cuenta.findAll();
        res.json(cuentas);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
};

module.exports.getCuenta = async (req, res) => {
  try {
    const {id} = req.params;
    const codigo = id.toString();
    const cuenta = await Cuenta.findByPk(codigo);
    res.json(cuenta);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
};

module.exports.createCuenta = async (req, res) => {
  try {
    const { codigo, nombre, clasificacion } = req.body;
    if (codigo.length > 4){
      const cuentaPadre = await Cuenta.findByPk(codigo.slice(0,-2));
      if (cuentaPadre) {
        const newCuenta = await Cuenta.create({
          codigo,
          nombre,
          clasificacion
        });
        cuentaPadre.hasSubcuenta = true;
        await cuentaPadre.save();
        res.json(newCuenta);
      } else {
        throw new Error(`El código ingresado tiene el formato del de una subcuenta. Debe existir primero una cuenta con el código ${codigo.slice(0,-2)} para que exista una subcuenta con el código ${codigo}`);
      }
    } else {
      const newCuenta = await Cuenta.create({
        codigo,
        nombre,
        clasificacion
      });
      res.json(newCuenta);
    }
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
};

module.exports.updateCuenta = async (req, res) => {
  try {
    const {id} = req.params;
    const codigo = id.toString();

    const {nombre} = req.body;

    const cuenta = await Cuenta.findByPk(codigo);
    
    cuenta.nombre = nombre;

    await cuenta.save();

    res.json(cuenta);

  } catch (error) {
    return res.status(500).json({message : error.message});
  }
};

module.exports.deleteCuenta = async (req, res) => {
  try {
    const {id} = req.params;
    const codigo = id.toString();
    await Cuenta.destroy({
      where : {
        codigo
      }
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({message : error.message});
  }
};