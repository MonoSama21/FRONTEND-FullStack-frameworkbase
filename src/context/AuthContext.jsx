import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/auth.service';

/**
 * Contexto de Autenticación
 * Proporciona el estado de autenticación a toda la aplicación
 */
const AuthContext = createContext(null);

/**
 * Hook personalizado para usar el contexto de autenticación
 * @returns {Object} Contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

/**
 * Proveedor del Contexto de Autenticación
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [loading, setLoading] = useState(false);

  /**
   * Verificar autenticación al cargar la aplicación
   */
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  /**
   * Iniciar sesión
   * @param {string} username
   * @param {string} password
   */
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await authService.login(username, password);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
