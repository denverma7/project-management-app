import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Project Management App</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar