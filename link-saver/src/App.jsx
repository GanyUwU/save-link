import { Routes, Route, BrowserRouter ,Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import SavedLinks from './pages/SavedLinks';
import RegisterPage from './pages/Register';
import { ThemeProvider } from './context/ThemeContext';

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
