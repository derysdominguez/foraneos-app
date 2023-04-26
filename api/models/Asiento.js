const moment = require("moment");
const fs = require("fs"); // Módulo para leer archivos
const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");


const Asiento = sequelize.define(
  "asiento",
  {
    codigo: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      defaultValue: () => {
        const jsonFile = fs.readFileSync(path.resolve(__dirname, "../config/contador-asiento.json"));
        const objetoJSON = JSON.parse(jsonFile);
        let { contador, mes: mesRegistrado } = objetoJSON;
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        if (month !== mesRegistrado) {
          contador = 1;
          mesRegistrado = mesRegistrado === 12 ? 1 : mesRegistrado + 1;
        }
        const paddedMonth = month.toString().padStart(2, "0");
        const paddedCounter = contador.toString().padStart(4, "0");
        const nuevosValores = JSON.stringify({ contador : contador + 1, mes: mesRegistrado });
        fs.writeFileSync(path.resolve(__dirname, "../config/contador-asiento.json"), nuevosValores);
        return `${year}${paddedMonth}${paddedCounter}`;
      },
    },
    fecha_registrado: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    fecha_asiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: moment().format("YYYY-MM-DD"),
      validate: {
        isAfter: moment().startOf("month").subtract(1, "day").format("YYYY-MM-DD"),
        isBefore: moment().add(1, "day").format("YYYY-MM-DD")
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_reducida: {
      type: DataTypes.VIRTUAL,
      get() {
        return parseInt(this.codigo.slice(-4));
      },
      set() {
        throw new Error("Este campo no se puede agregar así.");
      },
    },
  },
  {
    timestamps: false,
    tableName : "asiento"
  }
);

module.exports = Asiento;
