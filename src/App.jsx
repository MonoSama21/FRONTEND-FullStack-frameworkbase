import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import './App.css';

/**
 * Componente Principal de la Aplicación
 * Configura las rutas y el contexto de autenticación
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública: Página principal con invitación */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta pública: Login para los novios */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Ruta protegida: Dashboard de confirmaciones */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta por defecto: Redirigir a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
