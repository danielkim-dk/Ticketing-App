'use client';
import React from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TicketStatusChart = ({ ticketCounts }) => {
  const chartData = {
    labels: ['New', 'Pending', 'Resolved'],
    datasets: [
      {
        label: 'Tickets',
        data: [
          ticketCounts && ticketCounts.counts
            ? parseInt(ticketCounts.counts['New'], 10) || 0
            : 0,
          ticketCounts && ticketCounts.counts
            ? parseInt(ticketCounts.counts['Pending'], 10) || 0
            : 0,
          ticketCounts && ticketCounts.counts
            ? parseInt(ticketCounts.counts['Resolved'], 10) || 0
            : 0,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const totalTickets = chartData.datasets[0].data.reduce(
    (acc, value) => acc + value,
    0
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: false,
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 16,
          },
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="h-[300px] border-2 p-5 rounded-lg shadow-lg">
      {totalTickets > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <div className="flex h-full items-center justify-center text-lg font-semibold">
          No Data
        </div>
      )}
    </div>
  );
};

export default TicketStatusChart;
