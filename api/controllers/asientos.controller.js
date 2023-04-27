const Asiento = require("../models/Asiento.js");
const AsientoDetalle = require("../models/AsientoDetalle.js");
const Cuenta = require("../models/Cuenta.js");
const sequelize = require("../database/database.js");
const fs = require("fs"); // Módulo para leer archivos
const path = require("path");
const Sequelize = require("sequelize");
const moment = require("moment");
module.exports.getAsientos = async (req, res) => {
  try {
    const asientos = await Asiento.findAll({
      include: {
        model: AsientoDetalle,
        attributes: { exclude: ["asientoid", "cuentaid"] },
        include: {
          model: Cuenta,
          as: "cuenta",
        },
      },
    });

    res.json(asientos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.createAsiento = async (req, res) => {
  const { fecha_asiento, descripcion, asientodetalles } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const newAsiento = await Asiento.create(
      {
        fecha_asiento,
        descripcion,
      },
      { transaction }
    );
    let total = 0;
    const promises = asientodetalles.map(async (detalle) => {
      const newAsientoDetalle = await newAsiento.createAsientodetalle(
        {
          cuentaid: detalle.cuentaid,
          lado: detalle.lado,
          monto: detalle.monto,
        },
        { transaction }
      );
      if (newAsientoDetalle.lado === "d") {
        total += newAsientoDetalle.monto;
      }
      if (newAsientoDetalle.lado === "h") {
        total -= newAsientoDetalle.monto;
      }
    });
    await Promise.all(promises); // Esperar a que todas las promesas se resuelvan
    if (total !== 0) {
      throw new Error("El total del debe y haber deben ser iguales.");
    }
    await transaction.commit();
    res.json(newAsiento);
  } catch (error) {
    await transaction.rollback();
    const jsonFile = fs.readFileSync(
      path.resolve(__dirname, "../config/contador-asiento.json")
    );
    const objetoJSON = JSON.parse(jsonFile);
    const nuevosValores = JSON.stringify({
      contador: objetoJSON.contador - 1,
      mes: objetoJSON.mes,
    });
    fs.writeFileSync(
      path.resolve(__dirname, "../config/contador-asiento.json"),
      nuevosValores
    );
    return res.status(500).json({ message: error.message });
  }
};

module.exports.deleteAsiento = async (req, res) => {
  const { id } = req.params;
  const codigo = id.toString();
  try {
    await Asiento.destroy({
      where: {
        codigo,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateAsiento = async (req, res) => {
  const { id: codigo } = req.params;
  const { fecha_asiento, descripcion, asientodetalles } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const updatedAsiento = await Asiento.findByPk(codigo);
    if (updatedAsiento) {
      const asientoDetalles = await AsientoDetalle.findAll({
        where: {
          asientoid: codigo,
        },
      });
      asientoDetalles.forEach(async (asientoDetalle) => {
        await asientoDetalle.destroy({ transaction });
      });
      let total = 0;
      const promises = asientodetalles.map(async (detalle) => {
        const newAsientoDetalle = await updatedAsiento.createAsientodetalle(
          {
            cuentaid: detalle.cuentaid,
            lado: detalle.lado,
            monto: detalle.monto,
          },
          { transaction }
        );
        if (newAsientoDetalle.lado === "d") {
          total += newAsientoDetalle.monto;
        }
        if (newAsientoDetalle.lado === "h") {
          total -= newAsientoDetalle.monto;
        }
      });
      await Promise.all(promises); // Esperar a que todas las promesas se resuelvan
      if (total !== 0) {
        throw new Error("El total del debe y haber deben ser iguales.");
      }
      updatedAsiento.fecha_asiento = fecha_asiento;
      updatedAsiento.descripcion = descripcion;
      await updatedAsiento.save({transaction});
      await transaction.commit();
      res.json(updatedAsiento);
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};
