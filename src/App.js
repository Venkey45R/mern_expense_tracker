import React, { useEffect, useState } from 'react';
import Graph from './component/Graph';
import Forms from './Forms';
import List from './List';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/form')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='min-h-screen bg-black '>
      <div className='w-full px-10 border-b-2 border-gray-400 '>
        <h1 className='py-6 text-lg tracking-wider text-white'>Hi, Mate!</h1>
      </div>
      <div className='flex justify-between px-20 py-10'>
        <div className='w-1/2 h-screen'>
          <Graph transactions={transactions} />
        </div>
        <div className='block w-2/5'>
          <Forms setTransactions={setTransactions} />
          <List transactions={transactions} setTransactions={setTransactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
