/**
 * Servicio de confirmaciones de asistencia
 * Gestiona las operaciones CRUD de confirmaciones
 */

import { get, post } from './apiClient';
// @ts-ignore - JavaScript config file
import config from '../config/api.config.js';
import type {
  ConfirmacionInput,
  ConfirmacionAsistencia,
  ApiSuccessResponse,
  ApiErrorResponse
} from '../types';

/**
 * Servicio de confirmaciones de asistencia
 */
class ConfirmacionesService {
  /**
   * Crear una nueva confirmación de asistencia
   * @param data - Datos de la confirmación
   * @returns Respuesta con la confirmación creada
   */
  async crearConfirmacion(
    data: ConfirmacionInput
  ): Promise<ApiSuccessResponse<ConfirmacionAsistencia> | ApiErrorResponse> {
    try {
      const response = await post<ApiSuccessResponse<ConfirmacionAsistencia>>(
        config.endpoints.confirmaciones,
        data
      );

      console.log('✅ Confirmación creada exitosamente');
      return response;
    } catch (error: any) {
      console.error('❌ Error al crear confirmación:', error);
      
      return {
        success: false,
        message: error.response?.data?.message || 'Error al crear la confirmación',
        error: error.message
      };
    }
  }

  /**
   * Obtener todas las confirmaciones
   * REQUIERE AUTENTICACIÓN
   * @returns Lista de todas las confirmaciones
   */
  async obtenerTodas(): Promise<ApiSuccessResponse<ConfirmacionAsistencia[]> | ApiErrorResponse> {
    try {
      const response = await get<ApiSuccessResponse<ConfirmacionAsistencia[]>>(
        config.endpoints.confirmaciones
      );

      console.log(`✅ ${response.data?.length || 0} confirmaciones obtenidas`);
      return response;
    } catch (error: any) {
      console.error('❌ Error al obtener confirmaciones:', error);
      
      return {
        success: false,
        message: error.response?.data?.message || 'Error al obtener confirmaciones',
        error: error.message
      };
    }
  }

  /**
   * Calcular estadísticas de las confirmaciones
   * @param confirmaciones - Lista de confirmaciones
   * @returns Estadísticas calculadas
   */
  calcularEstadisticas(confirmaciones: ConfirmacionAsistencia[]) {
    const totalConfirmaciones = confirmaciones.length;
    const asistentes = confirmaciones.filter(c => c.asistira);
    const noAsistentes = confirmaciones.filter(c => !c.asistira);
    
    const totalAsistentes = asistentes.length;
    const totalNoAsistentes = noAsistentes.length;
    
    // Calcular total de invitados (sumando numero_invitados de los que sí asisten)
    const totalInvitados = asistentes.reduce((sum, c) => sum + c.numero_invitados, 0);

    return {
      totalConfirmaciones,
      totalAsistentes,
      totalNoAsistentes,
      totalInvitados,
      porcentajeAsistencia: totalConfirmaciones > 0 
        ? Math.round((totalAsistentes / totalConfirmaciones) * 100) 
        : 0
    };
  }

  /**
   * Filtrar confirmaciones por búsqueda
   * @param confirmaciones - Lista de confirmaciones
   * @param searchTerm - Término de búsqueda
   * @returns Confirmaciones filtradas
   */
  filtrarConfirmaciones(
    confirmaciones: ConfirmacionAsistencia[],
    searchTerm: string
  ): ConfirmacionAsistencia[] {
    if (!searchTerm.trim()) {
      return confirmaciones;
    }

    const term = searchTerm.toLowerCase();
    
    return confirmaciones.filter(c => 
      c.nombre_completo.toLowerCase().includes(term) ||
      c.correo_electronico.toLowerCase().includes(term) ||
      c.telefono?.toLowerCase().includes(term) ||
      c.mensaje?.toLowerCase().includes(term)
    );
  }

  /**
   * Ordenar confirmaciones
   * @param confirmaciones - Lista de confirmaciones
   * @param campo - Campo por el cual ordenar
   * @param orden - Orden ascendente o descendente
   * @returns Confirmaciones ordenadas
   */
  ordenarConfirmaciones(
    confirmaciones: ConfirmacionAsistencia[],
    campo: keyof ConfirmacionAsistencia = 'created_at',
    orden: 'asc' | 'desc' = 'desc'
  ): ConfirmacionAsistencia[] {
    return [...confirmaciones].sort((a, b) => {
      const valorA = a[campo];
      const valorB = b[campo];

      if (valorA === null || valorA === undefined) return 1;
      if (valorB === null || valorB === undefined) return -1;

      if (valorA < valorB) return orden === 'asc' ? -1 : 1;
      if (valorA > valorB) return orden === 'asc' ? 1 : -1;
      return 0;
    });
  }
}

// Exportar instancia única del servicio (Singleton)
export const confirmacionesService = new ConfirmacionesService();
