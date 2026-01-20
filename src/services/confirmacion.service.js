import apiClient from './api';

/**
 * Servicio de Confirmaciones de Asistencia
 * Maneja las operaciones CRUD de confirmaciones
 */
const confirmacionService = {
  /**
   * Crear una nueva confirmación de asistencia
   * @param {Object} confirmacionData - Datos de la confirmación
   * @returns {Promise}
   */
  async crearConfirmacion(confirmacionData) {
    try {
      const response = await apiClient.post('/boda/asistencia', confirmacionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Error de conexión' };
    }
  },

  /**
   * Obtener todas las confirmaciones (requiere autenticación)
   * @returns {Promise}
   */
  async obtenerConfirmaciones() {
    try {
      const response = await apiClient.get('/boda/asistencia');
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Error de conexión' };
    }
  },
};

export default confirmacionService;
