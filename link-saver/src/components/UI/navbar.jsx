<<<<<<< HEAD
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
=======
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Linkify
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/saved-links" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Saved links
            </Link>
            <Link 
              to="/login" 
              className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
>>>>>>> 6579b39b7ca9963ba7ae4d8c6f9e824dd8d4c06e
      </div>
    </nav>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> 6579b39b7ca9963ba7ae4d8c6f9e824dd8d4c06e
