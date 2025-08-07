import React from 'react';
import { Link } from 'react-router-dom';

const CreateNoteButton = ({ onClick }) => {
  return (
    <Link
      to='/create-note'
      className="w-full p-3 bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center text-xl font-extrabold text-black hover:bg-blue-100 transition"
    >
      + Create Note
    </Link>
  );
};

export default CreateNoteButton;