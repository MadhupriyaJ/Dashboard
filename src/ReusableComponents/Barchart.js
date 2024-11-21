// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    
  const data = {
    labels: ['5',' ','9','', '11','','', '13','', '15', '','1','17','','', '19','','', '21','','', '23','','25','','27'],
    // labels: ['5','9','11','13','15','17','19','21','23','25','27'],
    // labels: ['1','2','3','4','5','6','7','8','9','10','12','13','14','15','16','17','18','19','20','21','22','23','24'],

    datasets: [
      {
        label: 'Activity',
        data: [4000, 10000, 4800, 4100,7000,7000, 6000,6500,4900,2000,7000, 8000,6000, 11000, 9000, 12000, 15000,11000,8000,4900,12000,7000,6000,6000,4500,4000],
        backgroundColor: 'rgba(114, 148, 255)',
        borderColor: 'rgba(114, 148, 255)',
        borderWidth: 2,
        borderRadius: 10,
        barPercentage: 1.2,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#fff' },
       
      },
      y: {
        ticks: {
          color: '#fff',
          callback: function(value) {
            return value/1000 + 'k';
          },
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        beginAtZero: true,
        max: 15000,
        stepSize: 4000,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.raw;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%' }} className=' h-36 '>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
