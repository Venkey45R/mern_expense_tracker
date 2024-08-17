import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Forms({ setTransactions }) {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/form', data)
      .then(response => {
        if (response.data === "success") {
          axios.get('http://localhost:3001/form')
            .then(response => {
              setTransactions(response.data);
              reset();
            })
            .catch(err => console.log(err));
        } else {
          alert("Please fill in all the fields.");
        }
      })
      .catch(err => console.log(err));
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="mb-6 ">
      <div className='flex py-10 mx-auto bg-gray-400 bg-opacity-20 justify-evenly rounded-t-xl'>
        <h1 className='text-xl font-bold text-center text-white '>Add New Transaction</h1>
        
        {/* Conditional rendering of plus and minus icons */}
        {!isVisible ? (
          <i 
            className="text-xl font-bold text-white cursor-pointer fa-solid fa-plus" 
            onClick={toggleVisibility}
          ></i>
        ) : (
          <i 
            className="text-xl font-bold text-white cursor-pointer fa-solid fa-minus" 
            onClick={toggleVisibility}
          ></i>
        )}
      </div>
      {isVisible && (
        <div className="flex justify-center w-full">
          <form className="block w-full px-10 pb-10 bg-gray-400 bg-opacity-20 rounded-b-xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="block">
              <input
                type="text"
                placeholder="transaction"
                {...register("name")}
                className="w-full p-2 rounded-lg"
              />
            </div>
            <div className="block my-6">
              <input
                type="number"
                placeholder="amount"
                {...register('amount')}
                className="w-full p-2 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <select {...register('type')} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg">
                <option value="Income">Income</option>
                <option value="Savings">Savings</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <button type="submit" className="w-full py-3 my-2 font-bold text-white bg-indigo-800 rounded-lg">
              Add new transaction
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Forms;
