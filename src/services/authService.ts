/**
 * Servicio de autenticación
 * Gestiona el login de los novios y el manejo del token JWT
 */

import { post } from './apiClient';
// @ts-ignore - JavaScript config file
import config from '../config/api.config.js';
import type { 
  LoginCredentials, 
  LoginResponse, 
  ApiErrorResponse,
  AuthUser 
} from '../types';

/**
 * Servicio de autenticación
 */
class AuthService {
  /**
   * Iniciar sesión
   * @param credentials - Usuario y contraseña
   * @returns Respuesta con token JWT
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse | ApiErrorResponse> {
    try {
      const response = await post<LoginResponse>(
        config.endpoints.login,
        credentials
      );

      // Si el login es exitoso, guardar el token en localStorage
      if (response.success && response.data?.token) {
        this.saveToken(response.data.token);
        console.log('✅ Token guardado exitosamente');
      }

      return response;
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      
      // Retornar error en formato consistente
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión',
        error: error.message
      };
    }
  }

  /**
   * Cerrar sesión
   * Elimina el token del localStorage
   */
  logout(): void {
    this.removeToken();
    console.log('👋 Sesión cerrada');
  }

  /**
   * Guardar token en localStorage
   * @param token - Token JWT
   */
  saveToken(token: string): void {
    localStorage.setItem(config.tokenKey, token);
  }

  /**
   * Obtener token del localStorage
   * @returns Token JWT o null
   */
  getToken(): string | null {
    return localStorage.getItem(config.tokenKey);
  }

  /**
   * Eliminar token del localStorage
   */
  removeToken(): void {
    localStorage.removeItem(config.tokenKey);
  }

  /**
   * Verificar si el usuario está autenticado
   * @returns true si hay un token guardado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtener datos del usuario desde el token
   * NOTA: En una aplicación real, decodificarías el JWT para obtener los datos
   * Por ahora, retornamos un objeto simple
   * @returns Datos del usuario o null
   */
  getCurrentUser(): AuthUser | null {
    const token = this.getToken();
    
    if (!token) {
      return null;
    }

    // En producción, aquí decodificarías el JWT
    // Por ahora retornamos datos básicos
    return {
      username: 'diter-vivian',
      token: token,
      expiresIn: config.tokenExpiration
    };
  }

  /**
   * Verificar si el token está expirado
   * NOTA: En una aplicación real, decodificarías el JWT y verificarías el exp
   * Por ahora retornamos false (asumimos que no está expirado)
   * @returns true si el token está expirado
   */
  isTokenExpired(): boolean {
    // TODO: Implementar decodificación de JWT y verificación de expiración
    // Por ahora, asumimos que no está expirado
    return false;
  }
}

// Exportar instancia única del servicio (Singleton)
export const authService = new AuthService();
