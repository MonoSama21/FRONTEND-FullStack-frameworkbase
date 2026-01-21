/**
 * Cliente HTTP base para todas las peticiones a la API
 * Configurado con axios y manejo centralizado de errores
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
// @ts-ignore - JavaScript config file
import config from '../config/api.config.js';

/**
 * Instancia de axios configurada con la URL base de la API
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.axiosConfig.timeout,
  headers: config.axiosConfig.headers,
});

/**
 * Interceptor de request para agregar el token JWT a las peticiones
 */
apiClient.interceptors.request.use(
  (requestConfig) => {
    // Obtener token del localStorage
    const token = localStorage.getItem(config.tokenKey);
    
    // Si existe token, agregarlo al header Authorization
    if (token && requestConfig.headers) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de response para manejar errores de forma centralizada
 */
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, retornarla
    return response;
  },
  (error: AxiosError) => {
    // Manejar diferentes tipos de errores
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const status = error.response.status;
      
      switch (status) {
        case 401:
          // Token inválido o expirado - limpiar localStorage y redirigir
          console.error('🔒 Sesión expirada o no autorizado');
          localStorage.removeItem(config.tokenKey);
          
          // Solo redirigir si no estamos ya en login
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
        
        case 403:
          console.error('🚫 Acceso prohibido');
          break;
        
        case 404:
          console.error('🔍 Recurso no encontrado');
          break;
        
        case 500:
          console.error('💥 Error interno del servidor');
          break;
        
        default:
          console.error(`⚠️ Error del servidor: ${status}`);
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      console.error('🌐 Sin respuesta del servidor:', error.message);
    } else {
      // Algo pasó al configurar la petición
      console.error('⚠️ Error al configurar la petición:', error.message);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Función helper para hacer peticiones GET
 */
export const get = async <T = any>(
  url: string,
  axiosConfig?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.get<T>(url, axiosConfig);
  return response.data;
};

/**
 * Función helper para hacer peticiones POST
 */
export const post = async <T = any>(
  url: string,
  data?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, axiosConfig);
  return response.data;
};

/**
 * Función helper para hacer peticiones PUT
 */
export const put = async <T = any>(
  url: string,
  data?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, axiosConfig);
  return response.data;
};

/**
 * Función helper para hacer peticiones DELETE
 */
export const del = async <T = any>(
  url: string,
  axiosConfig?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.delete<T>(url, axiosConfig);
  return response.data;
};

export default apiClient;
