/**
 * Contexto de autenticación
 * Proporciona estado global de autenticación a toda la aplicación
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import type { AuthContextType, AuthUser, LoginCredentials } from '../types';

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props del provider
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider del contexto de autenticación
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Verificar si hay una sesión activa al cargar la app
   */
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      
      if (currentUser && !authService.isTokenExpired()) {
        setUser(currentUser);
        console.log('✅ Sesión activa detectada');
      } else {
        // Si el token está expirado, limpiar todo
        if (currentUser) {
          authService.logout();
        }
        setUser(null);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Función para iniciar sesión
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await authService.login(credentials);

      if (response.success && 'data' in response) {
        const userData: AuthUser = {
          username: response.data.username,
          token: response.data.token,
          expiresIn: response.data.expiresIn
        };
        
        setUser(userData);
        console.log('✅ Usuario autenticado:', userData.username);
      } else {
        throw new Error('message' in response ? response.message : 'Error al iniciar sesión');
      }
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      throw error;
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = (): void => {
    authService.logout();
    setUser(null);
    console.log('👋 Sesión cerrada');
  };

  /**
   * Valor del contexto
   */
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto de autenticación
 * @throws Error si se usa fuera del AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};

export default AuthContext;
