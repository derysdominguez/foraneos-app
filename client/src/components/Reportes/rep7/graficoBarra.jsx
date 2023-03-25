import React from 'react';
import { Bar } from 'react-chartjs-2';


function BarChart2(props) {
    const { cantidad } = props
    
    const data = {
        labels: ['Kinder','Preparatoria','Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo'],
        datasets: [
            {
                label: 'Cantidad de morosos',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: cantidad
            }
        ]
    }; 
    const options = {
        title: {
            display: true,
            text: 'Comparación de Datos A y B',
            fontSize: 20
        },
        legend: {
            display: true,
            position: 'top'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    
    return (
        <Bar data={data} options={options}/>
    );
}

export default BarChart2;
