const moment = require("moment");
const fs = require("fs"); // Módulo para leer archivos
const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");


const Asiento = sequelize.define("asiento", {
  codigo: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    defaultValue: () => {
      const jsonFile = fs.readFileSync("./contador-asiento.json");
      const objetoJSON = JSON.parse(jsonFile);
      const { contador, mes : mesRegistrado } = objetoJSON;
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      if (month !== mesRegistrado) {
        contador = 1;
        mesRegistrado = mesRegistrado === 12 ? 1 : mesRegistrado + 1;
      }

      const nuevosValores = JSON.stringify({contador, mes : mesRegistrado});
      fs.writeFileSync("./contador-asiento.json", nuevosValores);
      const paddedMonth = month.toString().padStart(2, "0");
      const paddedCounter = contador.toString().padStart(4, "0");

      return `${year}${paddedMonth}${paddedCounter}`;
    },
    fechaRegistrado: {
        type: DataTypes.DATE,
        allowNull : false,
        defaultValue: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    fechaAsiento : {
        type : DataTypes.DATEONLY,
        allowNull : false,
        defaultValue: moment().format('YYYY-MM-DD'),
        validate : {
            isAfter: moment().startOf('month').subtract(1, 'day').format('YYYY-MM-DD'), 
            isBefore: moment().startOf('month').add(1, 'day').format('YYYY-MM-DD')
        }
    },
    descripcion : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    idReducida : {
        type : DataTypes.VIRTUAL,
        get() {
            return parseInt(this.codigo.slice(-4));
        },
        set() {
            throw new Error("Este campo no se puede agregar así.");
        }
    }
  },
});

module.exports = Asiento;