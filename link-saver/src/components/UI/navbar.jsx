import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear auth token
    navigate('/login');               // Redirect to login
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-black p-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
      <div>
        <Link to="/" className="text-2xl font-bold text-black">
          Link<span className="text-gray-700">ify</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/saved-links"
          className="text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors txtd"
        >
          Saved Links
        </Link>
        <button
          onClick={handleSignOut}
          className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
