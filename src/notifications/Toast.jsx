import React from 'react';

const Toast = ({ message, type }) => {
  const bgColor = type === 'error' ? 'bg-red-200' : 'bg-green-200';

  return (
    <div
      className={`${bgColor} text-black px-4 py-2 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] font-bold rounded-md min-w-[220px]`}
    >
      {message}
    </div>
  );
};

export default Toast;