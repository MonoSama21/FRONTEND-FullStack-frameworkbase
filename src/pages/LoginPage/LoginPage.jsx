import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

/**
 * Componente de Página de Login
 * Permite a los novios iniciar sesión para ver las confirmaciones
 */
const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  /**
   * Manejar cambios en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Enviar formulario de login
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(credentials.username, credentials.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Diter & Vivian</h1>
          <p>Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoComplete="username"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <a href="/" className="back-link">← Volver a la invitación</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
