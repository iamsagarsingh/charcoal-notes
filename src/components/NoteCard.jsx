import React from 'react';

const NoteCard = ({ title, createdAt }) => {
  return (
    <div className="bg-blue-200 border-4 border-black p-4 rounded-lg shadow-[5px_5px_0px_rgba(0,0,0,1)] w-full md:max-w-sm my-4 md:my-0">
      <h3 className="text-xl font-extrabold mb-2 text-black">
        {title}
      </h3>
      <p className="text-sm font-semibold text-gray-700">
        Created on: <span className="font-bold">{createdAt}</span>
      </p>
    </div>
  );
};

export default NoteCard;