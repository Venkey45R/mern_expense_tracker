import React from 'react';
import axios from 'axios';

function List({ transactions, setTransactions }) {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/form/${id}`)
      .then(() => {
        // Remove the deleted transaction from the state
        setTransactions(transactions.filter(transaction => transaction._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='flex flex-col justify-center bg-gray-400 bg-opacity-20 rounded-3xl'>
      <h1 className='py-4 text-xl font-bold text-center text-white'>History</h1>
      <div className='flex flex-col w-full gap-3'>
        {transactions.map((val) => (
          <Transaction
            key={val._id}
            category={val}
            onDelete={() => handleDelete(val._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default List;

function Transaction({ category, onDelete }) {
  if (!category) {
    return null;
  }

  console.log('Category type:', category.type); 

  return (
    <div className='flex justify-between py-2 mx-8 my-1 text-white'>
      <span className='w-2/4'>{category.date.substring(0, 10)}</span>
      <span className='w-2/4'>{category.name}</span>
      <span className='w-2/4'>{category.amount}</span>
      <button className='w-1/4' onClick={onDelete}><i className="text-red-500 fa-solid fa-trash"></i></button>
    </div>
  );
}


function getColor(type) {
  console.log('Type received for color:', type); 
  switch (type) {
    case 'Income':
      return 'rgb(139, 92, 246)';
    case 'Expense':
      return 'rgb(91, 33, 182)';
    case 'Savings':
      return 'rgb(157, 23, 77)';
    default:
      return 'rgb(201, 203, 207)'; // Default grey color
  }
}

