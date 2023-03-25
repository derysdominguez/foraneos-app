import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function LineChart({ data }) {
    const headers = Object.keys(data[0]);
    const labels = data.map(datum => datum[headers[0]]);

    const chartData = {
    labels: labels,
    datasets: headers.slice(1).map((header, index) => ({
        label: header,
        data: data.map(datum => datum[header]),
        fill: false,
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    })),
};

const chartOptions = {
    options: {
        responsive: false,
        scales: {
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 80
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              stepSize: 20,
            }
          }]
        }
      }
};

    return (
        <Line data={chartData} options={chartOptions} />
    );
}

export default LineChart;
