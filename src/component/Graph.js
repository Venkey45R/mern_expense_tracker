import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import Label from './Label';

Chart.register(ArcElement, Tooltip, Legend);

function calculateTotals(transactions) {
  if (transactions.length === 0) {
    return {
      labels: ['Remaining', 'Expense', 'Savings'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',  
          'rgb(255, 205, 86)',  
        ],
        hoverOffset: 4,
      }],
    };
  }

  const totals = transactions.reduce((acc, transaction) => {
    acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount;
    return acc;
  }, {});

  const income = totals['Income'] || 0;
  const expense = totals['Expense'] || 0;
  const savings = totals['Savings'] || 0;
  const remaining = income - (expense + savings);
  return {
    labels: ['Remaining', 'Expense', 'Savings'],
    datasets: [{
      data: [
        remaining > 0 ? remaining : 0,
        expense,
        savings,
      ],
      backgroundColor: [
        'rgb(139, 92, 246)',  // Remaining
        'rgb(91, 33, 182)',  // Expense
        'rgb(157, 23, 77)',  // Savings
      ],
      hoverOffset: 4,
    }],
  };
}

function Graph({ transactions = [] }) {
  const data = calculateTotals(transactions);

  const totalAmount = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const percentages = data.datasets[0].data.map((amount, index) => ({
    type: data.labels[index],
    amount,
    percent: totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(2) : 0,
  }));

  const options = {
    cutout: 60,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  console.log();
  return (
    <div className='px-20 my-2'>
      <div className='mb-16 h-1/2'>
      <div className='block mt-4 mb-10'>
        <h2 className='my-2 text-xl font-bold text-white'>Total Balance</h2>
        <h2 className='text-3xl font-semibold tracking-wider text-white'>{data.datasets[0].data[0]}$</h2>
      </div>
      <div className='grid grid-cols-2 gap-y-10 gap-x-4'>
        <div className='flex items-center gap-8 px-10 py-4 font-light text-white bg-gray-400 bg-opacity-20 rounded-2xl'>
          <i class="fa-solid fa-arrow-trend-up text-3xl"></i>
          <div className='block'>
           <p className='text-base'>Savings</p>  
            <p className='text-base font-bold'>{data.datasets[0].data[2]} $</p>
          </div>
        </div>
        <div className='flex items-center gap-8 px-10 font-light text-white bg-gray-400 bg-opacity-20 rounded-2xl'>
          <i class="fa-solid fa-arrow-trend-down text-3xl"></i>
          <div className='block'>
           <p className='text-base'>Expense</p>  
            <p className='text-base font-bold'>{data.datasets[0].data[1]} $</p>
          </div>
        </div>
      </div>
      </div>
      <div className=' h-1/2'>
      <div className='px-10 py-10 bg-gray-400 bg-opacity-20 rounded-3xl'>
        <h2 className='text-sm font-semibold text-white'>Expense by category</h2>
          <div className='flex justify-between gap-20 my-4 text-sm font-light text-white'>
            <div className='w-1/2 h-40'>
              <Label percentages={percentages} />
            </div>
            <div className='w-1/2'>
              <div className='h-40'>
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
