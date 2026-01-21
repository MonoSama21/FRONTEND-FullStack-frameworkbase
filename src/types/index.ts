/**
 * Tipos e interfaces para la aplicación de invitación de boda
 * Basados en la especificación OpenAPI 3.0.3
 */

// ==================== CONFIRMACIÓN DE ASISTENCIA ====================

/**
 * Datos de entrada para crear una confirmación de asistencia
 */
export interface ConfirmacionInput {
  nombre_completo: string;
  correo_electronico: string;
  telefono?: string | null;
  asistira: boolean;
  numero_invitados: number;
  cancion_favorita?: string | null;
  mensaje?: string | null;
}

/**
 * Modelo completo de confirmación (incluye ID y timestamps)
 */
export interface ConfirmacionAsistencia extends ConfirmacionInput {
  id: number;
  created_at: string;
  updated_at: string;
}

// ==================== AUTENTICACIÓN ====================

/**
 * Credenciales de login
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Respuesta de login exitoso
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    expiresIn: string;
    username: string;
  };
}

/**
 * Datos del usuario autenticado
 */
export interface AuthUser {
  username: string;
  token: string;
  expiresIn: string;
}

// ==================== RESPUESTAS DE API ====================

/**
 * Respuesta genérica exitosa de la API
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  message?: string;
  data?: T;
}

/**
 * Respuesta de error de la API
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}

/**
 * Tipo unión para todas las respuestas de API
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// ==================== FORMULARIOS ====================

/**
 * Datos del formulario de RSVP (antes de enviar a API)
 */
export interface RSVPFormData {
  fullName: string;
  email: string;
  phone?: string;
  willAttend: boolean;
  numberOfGuests: number;
  favoriteSong?: string;
  message?: string;
}

/**
 * Datos del formulario de Login
 */
export interface LoginFormData {
  username: string;
  password: string;
}

// ==================== ESTADÍSTICAS ====================

/**
 * Estadísticas del dashboard
 */
export interface DashboardStats {
  totalConfirmaciones: number;
  totalAsistentes: number;
  totalNoAsistentes: number;
  totalInvitados: number;
}

// ==================== UTILIDADES ====================

/**
 * Estado de carga genérico
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Props comunes para componentes
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// ==================== CONTEXTO DE AUTENTICACIÓN ====================

/**
 * Estado del contexto de autenticación
 */
export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
