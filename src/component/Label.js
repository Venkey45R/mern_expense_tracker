import React from 'react';

function Label({ percentages }) {
  return (
    <div>
      {percentages.map((value, index) =>
        <LabelComponent key={index} data={value}></LabelComponent>
      )}
    </div>
  );
}

function LabelComponent({ data }) {
  if (!data) {
    return null;
  }
  return (
    <div className='flex justify-between py-2'>
      <div className='flex gap-2 my-2'>
        <div className='w-4 h-4 mt-1 rounded-full' style={{ backgroundColor: getColor(data.type) }}></div>
        <h3 className='text-sm font-semibold'>{data.type ?? ""}</h3>
      </div>
      <h3 className='mt-2 text-sm font-semibold'>{data.percent ?? ""}%</h3>
    </div>
  );
}

function getColor(type) {
  switch (type) {
    case 'Remaining':
      return 'rgb(139, 92, 246)'
    case 'Expense':
      return 'rgb(91, 33, 182)';
    case 'Savings':
      return 'rgb(157, 23, 77)';
    default:
      return 'rgb(201, 203, 207)'; // Default grey color
  }
}

export default Label;
