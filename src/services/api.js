import axios from 'axios';
import config from '../config/api.config';

/**
 * Instancia de Axios configurada con la URL base de la API
 * y los interceptores para manejo de autenticación y errores
 */
const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

/**
 * Interceptor de requests
 * Agrega automáticamente el token JWT a las peticiones autenticadas
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('boda_auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de responses
 * Maneja errores globales como token expirado
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token es inválido o expiró, limpiamos localStorage y redirigimos a login
    if (error.response?.status === 401) {
      localStorage.removeItem('boda_auth_token');
      
      // Solo redirigir si no estamos ya en la página de login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
