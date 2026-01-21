/**
 * Dashboard para los novios
 * Muestra todas las confirmaciones de asistencia con estadísticas y filtros
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  LogOut, 
  Users, 
  CheckCircle, 
  XCircle, 
  Music,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Loader2,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { confirmacionesService } from '../../services/confirmacionesService';
import type { ConfirmacionAsistencia } from '../../types';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();
  
  const [confirmaciones, setConfirmaciones] = useState<ConfirmacionAsistencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<ConfirmacionAsistencia | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'attending' | 'not-attending'>('all');

  // Verificar autenticación
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Cargar confirmaciones al montar el componente
  useEffect(() => {
    loadConfirmaciones();
  }, []);

  /**
   * Cargar todas las confirmaciones desde la API
   */
  const loadConfirmaciones = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await confirmacionesService.obtenerTodas();
      
      if (response.success && response.data) {
        setConfirmaciones(response.data);
      } else {
        setError(response.message || 'Error al cargar confirmaciones');
      }
    } catch (err: any) {
      console.error('Error cargando confirmaciones:', err);
      setError('Error al cargar las confirmaciones');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cerrar sesión
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * Filtrar y buscar confirmaciones
   */
  const getFilteredConfirmaciones = () => {
    let filtered = confirmaciones;

    // Filtrar por tipo
    if (filterType === 'attending') {
      filtered = filtered.filter(c => c.asistira);
    } else if (filterType === 'not-attending') {
      filtered = filtered.filter(c => !c.asistira);
    }

    // Buscar por término
    if (searchTerm.trim()) {
      filtered = confirmacionesService.filtrarConfirmaciones(filtered, searchTerm);
    }

    // Ordenar por fecha de creación (más recientes primero)
    return confirmacionesService.ordenarConfirmaciones(filtered, 'created_at', 'desc');
  };

  /**
   * Calcular estadísticas
   */
  const stats = confirmacionesService.calcularEstadisticas(confirmaciones);

  const filteredConfirmaciones = getFilteredConfirmaciones();

  /**
   * Formatear fecha
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-rose-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando confirmaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-600" fill="currentColor" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Bienvenidos, {user?.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                Ver invitación
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Confirmaciones</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalConfirmaciones}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sí Asisten</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAsistentes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">No Asisten</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalNoAsistentes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-rose-100 p-3 rounded-lg">
                <Heart className="w-6 h-6 text-rose-600" fill="currentColor" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Invitados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInvitados}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email, teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType('attending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'attending'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Asisten
              </button>
              <button
                onClick={() => setFilterType('not-attending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'not-attending'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No Asisten
              </button>
            </div>

            {/* Botón Refrescar */}
            <button
              onClick={loadConfirmaciones}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Recargar confirmaciones"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refrescar</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando {filteredConfirmaciones.length} de {confirmaciones.length} confirmaciones
            </div>
            <div className="text-xs text-gray-500">
              Última actualización: {new Date().toLocaleTimeString('es-ES')}
            </div>
          </div>
        </div>

        {/* Lista de confirmaciones */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredConfirmaciones.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay confirmaciones que mostrar</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Invitado
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Asistencia
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Invitados
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredConfirmaciones.map((guest) => (
                    <tr 
                      key={guest.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{guest.nombre_completo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            {guest.correo_electronico}
                          </div>
                          {guest.telefono && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              {guest.telefono}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {guest.asistira ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4" />
                            Sí asiste
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="w-4 h-4" />
                            No asiste
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-900 font-medium">{guest.numero_invitados}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(guest.created_at)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedGuest(guest)}
                          className="text-rose-600 hover:text-rose-800 font-medium text-sm"
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {selectedGuest && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedGuest(null)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Detalles de Confirmación</h2>
              <button
                onClick={() => setSelectedGuest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nombre Completo</label>
                <p className="text-lg text-gray-900">{selectedGuest.nombre_completo}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <p className="text-gray-900">{selectedGuest.correo_electronico}</p>
                </div>
                {selectedGuest.telefono && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono</label>
                    <p className="text-gray-900">{selectedGuest.telefono}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Asistencia</label>
                  <p className={`font-semibold ${selectedGuest.asistira ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedGuest.asistira ? '✓ Sí asistirá' : '✗ No asistirá'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Número de Invitados</label>
                  <p className="text-gray-900 font-semibold">{selectedGuest.numero_invitados}</p>
                </div>
              </div>

              {selectedGuest.cancion_favorita && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    <Music className="w-4 h-4 inline mr-1" />
                    Canción Favorita
                  </label>
                  <p className="text-gray-900">{selectedGuest.cancion_favorita}</p>
                </div>
              )}

              {selectedGuest.mensaje && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Mensaje
                  </label>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedGuest.mensaje}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Fecha de Confirmación
                </label>
                <p className="text-gray-900">{formatDate(selectedGuest.created_at)}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedGuest(null)}
                className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
