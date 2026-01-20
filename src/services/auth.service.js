import apiClient from './api';

/**
 * Servicio de Autenticación
 * Maneja el login de los novios
 */
const authService = {
  /**
   * Iniciar sesión
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise} Promesa con los datos de autenticación
   */
  async login(username, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
      });
      
      // Guardar el token en localStorage
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('boda_auth_token', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Error de conexión' };
    }
  },

  /**
   * Cerrar sesión
   */
  logout() {
    localStorage.removeItem('boda_auth_token');
  },

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('boda_auth_token');
  },

  /**
   * Obtener el token actual
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('boda_auth_token');
  },
};

export default authService;
