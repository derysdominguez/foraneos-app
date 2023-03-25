import React from 'react';
import { Bar } from 'react-chartjs-2';


function BarChart(props) {
    const { becados, mediaBeca} = props
    
    const data = {
        labels: ['Kinder','Preparatoria','Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo'],
        datasets: [
            {
                label: 'Becados',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: becados
            },
            {
                label: 'Sin becas',
                backgroundColor: 'rgba(255,99,132,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: mediaBeca
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

export default BarChart;
