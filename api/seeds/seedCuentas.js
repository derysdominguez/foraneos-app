
const Cuenta = require("../models/Cuenta.js");
const catalogoDeCuentas = [
  { codigo: "1101", nombre: "Caja", clasificacion: "activo" },
  { codigo: "1102", nombre: "Banco", clasificacion: "activo" },
  { codigo: "1103", nombre: "Cuentas por cobrar", clasificacion: "activo" },
  {
    codigo: "110301",
    nombre: "Cuentas por cobrar generales",
    clasificacion: "activo",
  },
  {
    codigo: "110302",
    nombre: "Cuentas por cobrar - impuestos",
    clasificacion: "activo",
  },
  {
    codigo: "110303",
    nombre: "Otras cuentas por cobrar",
    clasificacion: "activo",
  },
  { codigo: "1104", nombre: "Inventarios", clasificacion: "activo" },
  {
    codigo: "110401",
    nombre: "Inventario de papelería",
    clasificacion: "activo",
  },
  { codigo: "110402", nombre: "Útiles de oficina", clasificacion: "activo" },
  { codigo: "110403", nombre: "Material didáctico", clasificacion: "activo" },
  { codigo: "110404", nombre: "Libros", clasificacion: "activo" },
  { codigo: "110405", nombre: "Otros materiales", clasificacion: "activo" },
  {
    codigo: "1105",
    nombre: "Gastos pagados por anticipado",
    clasificacion: "activo",
  },
  {
    codigo: "1106",
    nombre: "Anticipos a proveedores",
    clasificacion: "activo",
  },
  { codigo: "1201", nombre: "Edificios", clasificacion: "activo" },
  { codigo: "1202", nombre: "Terrenos", clasificacion: "activo" },
  { codigo: "1203", nombre: "Vehículos", clasificacion: "activo" },
  { codigo: "1204", nombre: "Mobiliario y equipo", clasificacion: "activo" },
  { codigo: "1205", nombre: "Depreciacion edificio", clasificacion: "activo" },
  {
    codigo: "1206",
    nombre: "Depreciacion mobiliario",
    clasificacion: "activo",
  },
  { codigo: "1207", nombre: "Otros activos", clasificacion: "activo" },
  {
    codigo: "1208",
    nombre: "Construcciones en proceso",
    clasificacion: "activo",
  },
  {
    codigo: "2001",
    nombre: "Cuentas por pagar",
    clasificacion: "pasivo",
  },
  {
    codigo: "200101",
    nombre: "Préstamos",
    clasificacion: "pasivo",
  },
  {
    codigo: "200102",
    nombre: "Préstamos a organizaciones",
    clasificacion: "pasivo",
  },
  {
    codigo: "200103",
    nombre: "Impuesto municipal",
    clasificacion: "pasivo",
  },
  {
    codigo: "200104",
    nombre: "Otras cuentas por pagar",
    clasificacion: "pasivo",
  },
  {
    codigo: "200105",
    nombre: "Otras retenciones por pagar",
    clasificacion: "pasivo",
  },
  {
    codigo: "20010501",
    nombre: "IHSS",
    clasificacion: "pasivo",
  },
  {
    codigo: "20010502",
    nombre: "INFOP",
    clasificacion: "pasivo",
  },
  {
    codigo: "20010503",
    nombre: "RAP",
    clasificacion: "pasivo",
  },
  {
    codigo: "20010504",
    nombre: "IMPREMAH",
    clasificacion: "pasivo",
  },
  {
    codigo: "20010505",
    nombre: "ENEE",
    clasificacion: "pasivo",
  },
  {
    codigo: "20010506",
    nombre: "Impuestos sobre la renta",
    clasificacion: "pasivo",
  },
  {
    codigo: "20010507",
    nombre: "Impuestos sobre venta",
    clasificacion: "pasivo",
  },
  {
    codigo: "3001",
    nombre: "Capital social",
    clasificacion: "patrimonio",
  },
  {
    codigo: "3002",
    nombre: "Utilidades del ejercicio",
    clasificacion: "patrimonio",
  },
  {
    codigo: "3003",
    nombre: "Utilidades de años anteriores",
    clasificacion: "patrimonio",
  },
  {
    codigo: "4001",
    nombre: "Mensualidades",
    clasificacion: "ingreso",
  },
  {
    codigo: "400101",
    nombre: "Mensualidades - Kinder",
    clasificacion: "ingreso",
  },
  {
    codigo: "400102",
    nombre: "Mensualidades- Prepa",
    clasificacion: "ingreso",
  },
  {
    codigo: "400103",
    nombre: "Mensualidades - Primero",
    clasificacion: "ingreso",
  },
  {
    codigo: "400104",
    nombre: "Mensualidades -Segundo",
    clasificacion: "ingreso",
  },
  {
    codigo: "400105",
    nombre: "Mensualidades - Tercero",
    clasificacion: "ingreso",
  },
  {
    codigo: "400106",
    nombre: "Mensualidades - Cuarto",
    clasificacion: "ingreso",
  },
  {
    codigo: "400107",
    nombre: "Mensualidades - Quinto",
    clasificacion: "ingreso",
  },
  {
    codigo: "400108",
    nombre: "Mensualidades - Sexto",
    clasificacion: "ingreso",
  },
  {
    codigo: "400109",
    nombre: "Mensualidades - Séptimo",
    clasificacion: "ingreso",
  },
  {
    codigo: "400110",
    nombre: "Mensualidades - Octavo",
    clasificacion: "ingreso",
  },
  {
    codigo: "400111",
    nombre: "Mensualidades - Noveno",
    clasificacion: "ingreso",
  },
  {
    codigo: "400112",
    nombre: "Mensualidades - Décimo",
    clasificacion: "ingreso",
  },
  {
    codigo: "400113",
    nombre: "Mensualidades - Undécimo",
    clasificacion: "ingreso",
  },
  {
    codigo: "4002",
    nombre: "Matriculas",
    clasificacion: "ingreso",
  },
  {
    codigo: "400201",
    nombre: "Matrícula- Kinder",
    clasificacion: "ingreso",
  },
  {
    codigo: "400202",
    nombre: "Matrícula- Prepa",
    clasificacion: "ingreso",
  },
  {
    codigo: "400203",
    nombre: "Matrícula - Primero",
    clasificacion: "ingreso",
  },
  {
    codigo: "400204",
    nombre: "Matrícula -Segundo",
    clasificacion: "ingreso",
  },
  {
    codigo: "400205",
    nombre: "Matrícula - Tercero",
    clasificacion: "ingreso",
  },
  {
    codigo: "400206",
    nombre: "Matrícula - Cuarto",
    clasificacion: "ingreso",
  },
  {
    codigo: "400207",
    nombre: "Matrícula - Quinto",
    clasificacion: "ingreso",
  },
  {
    codigo: "400208",
    nombre: "Matrícula - Sexto",
    clasificacion: "ingreso",
  },
  {
    codigo: "400209",
    nombre: "Matrícula - Séptimo",
    clasificacion: "ingreso",
  },
  {
    codigo: "400210",
    nombre: "Matrícula - Octavo",
    clasificacion: "ingreso",
  },
  {
    codigo: "400211",
    nombre: "Matrícula - Noveno",
    clasificacion: "ingreso",
  },
  {
    codigo: "400212",
    nombre: "Matrícula - Décimo",
    clasificacion: "ingreso",
  },
  {
    codigo: "400213",
    nombre: "Matrícula - Undécimo",
    clasificacion: "ingreso",
  },
  {
    codigo: "4003",
    nombre: "Donaciones",
    clasificacion: "ingreso",
  },
  {
    codigo: "4004",
    nombre: "Otros ingresos",
    clasificacion: "ingreso",
  },
  {
    codigo: "400401",
    nombre: "Dias de color",
    clasificacion: "ingreso",
  },
  {
    codigo: "400402",
    nombre: "Dias tipicos",
    clasificacion: "ingreso",
  },
  {
    codigo: "400403",
    nombre: "Alquileres",
    clasificacion: "ingreso",
  },
  {
    codigo: "400404",
    nombre: "Otros ingresos generales",
    clasificacion: "ingreso",
  },
  {
    codigo: "5001",
    nombre: "Sueldos y salarios",
    clasificacion: "gasto-ventas",
  },
  {
    codigo: "500101",
    nombre: "Sueldos maestros",
    clasificacion: "gasto-ventas",
  },
  {
    codigo: "500102",
    nombre: "Sueldos administrativos",
    clasificacion: "gasto-ventas",
  },
  {
    codigo: "500103",
    nombre: "Bonificaciones",
    clasificacion: "gasto-ventas",
  },
  { codigo: "5002", nombre: "Viaticos", clasificacion: "gasto-ventas" },
  {
    codigo: "500201",
    nombre: "Viaticos promotores",
    clasificacion: "gasto-ventas",
  },
  { codigo: "5003", nombre: "Publicidad", clasificacion: "gasto-ventas" },
  { codigo: "500301", nombre: "Eventos", clasificacion: "gasto-ventas" },
  { codigo: "500302", nombre: "Anuncios", clasificacion: "gasto-ventas" },
  { codigo: "5004", nombre: "Comunicaciones", clasificacion: "gasto-ventas" },
  { codigo: "500401", nombre: "Telefono", clasificacion: "gasto-ventas" },
  {
    codigo: "500402",
    nombre: "Fotocopiadora",
    clasificacion: "gasto-ventas",
  },
  { codigo: "500403", nombre: "Internet", clasificacion: "gasto-ventas" },
  {
    codigo: "5005",
    nombre: "Gastos publicos",
    clasificacion: "gasto-ventas",
  },
  { codigo: "500501", nombre: "Agua", clasificacion: "gasto-ventas" },
  { codigo: "500502", nombre: "Electricidad", clasificacion: "gasto-ventas" },
  {
    codigo: "6001",
    nombre: "Sueldos y salarios",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600101",
    nombre: "Sueldos y salarios maestros",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600102",
    nombre: "Sueldos y salarios administracion",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600103",
    nombre: "Sueldos y salarios vigilantes",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600104",
    nombre: "RAP",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600105",
    nombre: "Treceavo",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600106",
    nombre: "Catorceavo",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600107",
    nombre: "Seguro social",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600108",
    nombre: "Bonificaciones",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600109",
    nombre: "Vacaciones",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600110",
    nombre: "Prestaciones sociales",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600111",
    nombre: "IMPREMAH",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6002",
    nombre: "Comunicaciones",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600201",
    nombre: "Telefono",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600202",
    nombre: "Fotocopiadora",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600203",
    nombre: "Internet",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6003",
    nombre: "Servicios publicos",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600301",
    nombre: "Agua",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600302",
    nombre: "Electricidad",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6004",
    nombre: "Papeleria",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600401",
    nombre: "Material didactico",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600402",
    nombre: "Libros",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600403",
    nombre: "Utensilios y materiales",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600404",
    nombre: "Material para impresiones",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600405",
    nombre: "Otros materiales",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6005",
    nombre: "Gastos de viajes",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600501",
    nombre: "Gastos de viajes maestros",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600502",
    nombre: "Gastos de viajes junta directiva",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600503",
    nombre: "Gastos de viajes fundadores",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600504",
    nombre: "Otros gastos de viaje",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6006",
    nombre: "Festejos",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600601",
    nombre: "Eventos maestros",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600602",
    nombre: "Otros eventos",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6007",
    nombre: "Honorarios",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600701",
    nombre: "Dieta junta directiva",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600702",
    nombre: "Dieta fundadores",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600703",
    nombre: "Honorarios abogados",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "600704",
    nombre: "Honorarios por escriturizacion",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6008",
    nombre: "Gastos de graduacion basica",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6009",
    nombre: "Gastos de graduacion secundaria",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6010",
    nombre: "Proyectos",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601001",
    nombre: "Proyectos - Primaria",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601002",
    nombre: "Proyectos - Secundaria",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6011",
    nombre: "Mantenimiento",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601101",
    nombre: "Mantenimiento yarda",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601102",
    nombre: "Mantenimiento edificio",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601103",
    nombre: "Mantenimiento electrico",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601104",
    nombre: "Mantenimiento de computadoras",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601105",
    nombre: "Mantenimiento de mobiliario",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601106",
    nombre: "Mantenimiento aires acondicionados",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601107",
    nombre: "Otros mantenimientos",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6012",
    nombre: "Alquileres",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6013",
    nombre: "Impuestos",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601301",
    nombre: "Impuestos sobre venta",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601302",
    nombre: "Impuestos sobre compra",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601303",
    nombre: "Impuestos municipales",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601304",
    nombre: "Impuestos sobre renta",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601305",
    nombre: "Impuesto de bienes inmuebles",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6014",
    nombre: "Donaciones",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6015",
    nombre: "Gastos de beca",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "6016",
    nombre: "Otros gastos",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601601",
    nombre: "Comisiones bancarias",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601602",
    nombre: "Tasas de seguridad",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601603",
    nombre: "Intereses pagados",
    clasificacion: "gasto-admin",
  },
  {
    codigo: "601604",
    nombre: "Otros",
    clasificacion: "gasto-admin",
  }
];


module.exports.seedCuenta = async () => {
    try {
        catalogoDeCuentas.forEach(async cuenta => {
            if (cuenta.codigo.length > 4){
                const cuentaPadre = await Cuenta.findByPk(cuenta.codigo.slice(0,-2));
                if (cuentaPadre) {
                  const newCuenta = await Cuenta.create({cuenta});
                  cuentaPadre.hasSubcuenta = true;
                  await cuentaPadre.save();
                } else {
                  throw new Error(`El código ingresado tiene el formato del de una subcuenta. Debe existir primero una cuenta con el código ${cuenta.codigo} para que exista una subcuenta con el código ${cuenta.codigo.slice(0,-2)}`);
                }
              } else {

                await Cuenta.create({cuenta});
              }
        });
    } catch (error) {
        console.log("Error al crear cuenta", error.message);
    }
};
