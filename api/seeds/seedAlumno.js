
const Alumno = require('../models/Alumno.js');
const Mensualidad = require('../models/Mensualidad.js');

const alumnos = [
    {
        "codigo": "20222023007",
        "nombre": "Gabriela Maria Sanchez Ortiz",
        "grado": 6,
        "becaid": 1
        },
        {
        "codigo": "20222023008",
        "nombre": "David Alejandro Perez Espinoza",
        "grado": 9,
        "becaid": 2
        },
        {
        "codigo": "20222023009",
        "nombre": "Veronica Alejandra Torres Gomez",
        "grado": 11,
        "becaid": 3
        },
        {
        "codigo": "20222023010",
        "nombre": "Julio Cesar Garcia Hernandez",
        "grado": 3,
        "becaid": 1
        },
        {
        "codigo": "20222023011",
        "nombre": "Marisol Hernandez Rodriguez",
        "grado": 8,
        "becaid": 2
        },
        {
        "codigo": "20222023012",
        "nombre": "Cristian Alonso Rodriguez Gonzalez",
        "grado": 11,
        "becaid": 3
        },
        {
        "codigo": "20222023013",
        "nombre": "Paulina Gabriela Rodriguez Sanchez",
        "grado": 5,
        "becaid": 1
        },
        {
        "codigo": "20222023014",
        "nombre": "Oscar Andres Hernandez Garcia",
        "grado": 9,
        "becaid": 2
        },
        {
        "codigo": "20222023015",
        "nombre": "Alejandro Ramirez Cruz",
        "grado": 9,
        "becaid": 3
        },
        {
        "codigo": "20222023016",
        "nombre": "Miriam Guadalupe Gonzalez Ramirez",
        "grado": 2,
        "becaid": 1
        },
        {
        "codigo": "20222023017",
        "nombre": "Hector Emmanuel Torres Hernandez",
        "grado": 7,
        "becaid": 2
        },
        {
        "codigo": "20222023018",
        "nombre": "Jazmin Fernanda Lopez Torres",
        "grado": 3,
        "becaid": 3
        },
        {
        "codigo": "20222023019",
        "nombre": "Juan Carlos Hernandez Mendoza",
        "grado": 6,
        "becaid": 1
        },
        {
        "codigo": "20222023020",
        "nombre": "Estefania Guadalupe Perez Ortiz",
        "grado": 11,
        "becaid": 2
        },
        {
        "codigo": "20222023021",
        "nombre": "Angelica Maria Ramirez Torres",
        "grado": 7,
        "becaid": 3
        },
        {
        "codigo": "20222023022",
        "nombre": "Luis Fernando Garcia Ortiz",
        "grado": 3,
        "becaid": 1
        },
        {
        "codigo": "20222023023",
        "nombre": "Cristina Alejandra Hernandez Martinez",
        "grado": 8,
        "becaid": 2
        },
        {
        "codigo": "20222023024",
        "nombre": "Jose Antonio Torres Hernandez",
        "grado": 13,
        "becaid": 3
        },
        {
        "codigo": "20222023025",
        "nombre": "Carmen Elizabeth Sanchez Gonzalez",
        "grado": 4,
        "becaid": 1
        },
        {
        "codigo": "20222023026",
        "nombre": "Ricardo Alejandro Perez Diaz",
        "grado": 9,
        "becaid": 2
        },
        {
        "codigo": "20222023027",
        "nombre": "Fernanda Guadalupe Garcia Pacheco",
        "grado": 7,
        "becaid": 3
        },
        {
        "codigo": "20222023028",
        "nombre": "Miguel Angel Hernandez Rodriguez",
        "grado": 1,
        "becaid": 1
        },
        {
        "codigo": "20222023029",
        "nombre": "Diana Laura Ramirez Cruz",
        "grado": 6,
        "becaid": 2
        },
        {
        "codigo": "20222023030",
        "nombre": "Jorge Alberto Torres Ruiz",
        "grado": 11,
        "becaid": 3
        },
        {
        "codigo": "20222023031",
        "nombre": "Maria Fernanda Rodriguez Sanchez",
        "grado": 5,
        "becaid": 1
        },
        {
        "codigo": "20222023032",
        "nombre": "Oscar Andres Hernandez Garcia",
        "grado": 9,
        "becaid": 2
        },
        {
        "codigo": "20222023033",
        "nombre": "Alejandro Ramirez Cruz",
        "grado": 8,
        "becaid": 3
        },
        {
        "codigo": "20222023034",
        "nombre": "Miriam Guadalupe Gonzalez Ramirez",
        "grado": 2,
        "becaid": 1
        },
        {
        "codigo": "20222023035",
        "nombre": "Hector Emmanuel Torres Hernandez",
        "grado": 7,
        "becaid": 2
        },
        {
        "codigo": "20222023036",
        "nombre": "Jazmin Fernanda Lopez Torres",
        "grado": 12,
        "becaid": 3
        }
]

const ordenDeMensualiadades = [
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
  ];

module.exports.seedAlumno = async () => {
    try {
        alumnos.forEach(async alumno => {
            const alumnoCreado = await Alumno.create(alumno)
            ordenDeMensualiadades.forEach(async (mes) => {
                await Mensualidad.create({
                    alumnoid : alumnoCreado.id,
                    fecha_pago : null,
                    mes
                });
            });
        });
        
    } catch (error) {
        console.log("Error al crear alumno", error.message);
    }
};