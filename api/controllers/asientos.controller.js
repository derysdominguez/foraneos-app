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

module.exports.getReporteIngesosEgresos = async (req, res) => {
  const {mes} = req.body;
  try {
    const asientos = await Asiento.findAll({
      include: {
        // where : Sequelize.literal(`EXTRACT(MONTH FROM fecha_asiento) = ${mes}`),
        model: AsientoDetalle,
        attributes: { exclude: ["asientoid", "cuentaid"] },
        include: {
          model: Cuenta,
          as: "cuenta",
        },
      },
    });
    console.log(asientos);

    const asientosFormateados = [];
    if (asientos) {
      asientosRelevantes = asientos.forEach((asiento) => {
        const { fecha_asiento, descripcion, asientodetalles } = asiento;
        console.log(fecha_asiento);
        console.log(descripcion);
        console.log(asientodetalles);
        asientodetalles.forEach((renglon) => {
          if (renglon.dataValues.cuenta.dataValues.clasificacion === "ingreso") {
            asientosFormateados.push({
              fecha: fecha_asiento,
              cuenta: renglon.dataValues.cuenta.dataValues.nombre,
              descripcion,
              monto: renglon.dataValues.cuenta.dataValues.monto,
              entrada: "i",
            });
          }
          if (
            ["gasto-admin", "gasto-ventas"].includes(
              renglon.dataValues.cuenta.dataValues.clasificacion
            )
          ) {
            asientosFormateados.push({
              fecha: fecha_asiento,
              cuenta: renglon.dataValues.cuenta.dataValues.nombre,
              descripcion,
              monto: renglon.dataValues.cuenta.dataValues.monto,
              entrada: "e",
            });
          }
        });
      });
    } else{
      res.json({estado : "Sin datos."})
    }

    res.json(asientosFormateados);
  } catch (error) {
    res.status(500).json({ message: error.stack });
  }
};

module.exports.deleteAsiento = async (req, res) => {
  const { id: codigo } = req.params;
  codigoString = codigo.toString();
  try {
    await Asiento.destroy({
      where: {
        codigo: codigoString,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
