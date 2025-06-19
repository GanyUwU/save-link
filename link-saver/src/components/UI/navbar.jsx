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
      </div>
    </nav>
  );
};

export default Navbar;