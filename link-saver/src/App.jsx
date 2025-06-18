import { Routes, Route, BrowserRouter ,Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import SavedLinks from './pages/SavedLinks';
import RegisterPage from './pages/Register';

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On mount, check if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Handler to update auth status after login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Link Saver</h1>
        </header>
      </div>
      <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<RegisterPage onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/saved-links"
            element={isLoggedIn ? <SavedLinks /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App; 
