/**
 * Configuración de la API
 * Esta configuración se ajusta automáticamente según el entorno (development/production)
 * basándose en las variables de entorno de Vite
 */

const config = {
  // URL base de la API según el entorno
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Entorno actual
  environment: import.meta.env.VITE_APP_ENV || 'development',
  
  // Clave para almacenar el token JWT en localStorage
  tokenKey: 'boda_auth_token',
  
  // Tiempo de expiración del token (24 horas)
  tokenExpiration: '24h',
};

export default config;
