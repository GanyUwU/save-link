import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/Dashboard';
import SavedLinks from './pages/SavedLinks';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Link Saver</h1>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/saved-links" element={<SavedLinks />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App; 
