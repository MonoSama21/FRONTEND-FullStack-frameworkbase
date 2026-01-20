import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import confirmacionService from '../../services/confirmacion.service';
import './DashboardPage.css';

/**
 * Componente de Dashboard
 * Muestra la lista de confirmaciones de asistencia (solo para novios autenticados)
 */
const DashboardPage = () => {
  const [confirmaciones, setConfirmaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('todos'); // todos, asistiran, no_asistiran
  const { logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Cargar confirmaciones al montar el componente
   */
  useEffect(() => {
    cargarConfirmaciones();
  }, []);

  /**
   * Obtener confirmaciones desde la API
   */
  const cargarConfirmaciones = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await confirmacionService.obtenerConfirmaciones();
      setConfirmaciones(response.data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar las confirmaciones');
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
   * Filtrar confirmaciones
   */
  const confirmacionesFiltradas = confirmaciones.filter(conf => {
    if (filter === 'asistiran') return conf.asistira;
    if (filter === 'no_asistiran') return !conf.asistira;
    return true;
  });

  /**
   * Calcular estadísticas
   */
  const stats = {
    total: confirmaciones.length,
    asistiran: confirmaciones.filter(c => c.asistira).length,
    noAsistiran: confirmaciones.filter(c => !c.asistira).length,
    totalInvitados: confirmaciones.reduce((sum, c) => sum + (c.numero_invitados || 0), 0),
  };

  /**
   * Formatear fecha
   */
  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Panel de Administración</h1>
          <p>Boda Diter & Vivian - 2026</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión
        </button>
      </header>

      {/* Estadísticas */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Respuestas</div>
          </div>
          <div className="stat-card stat-success">
            <div className="stat-value">{stats.asistiran}</div>
            <div className="stat-label">Confirman Asistencia</div>
          </div>
          <div className="stat-card stat-danger">
            <div className="stat-value">{stats.noAsistiran}</div>
            <div className="stat-label">No Asistirán</div>
          </div>
          <div className="stat-card stat-info">
            <div className="stat-value">{stats.totalInvitados}</div>
            <div className="stat-label">Total Invitados</div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="filters-section">
        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'todos' ? 'active' : ''}`}
            onClick={() => setFilter('todos')}
          >
            Todos ({confirmaciones.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'asistiran' ? 'active' : ''}`}
            onClick={() => setFilter('asistiran')}
          >
            Asistirán ({stats.asistiran})
          </button>
          <button 
            className={`filter-btn ${filter === 'no_asistiran' ? 'active' : ''}`}
            onClick={() => setFilter('no_asistiran')}
          >
            No Asistirán ({stats.noAsistiran})
          </button>
        </div>
      </section>

      {/* Lista de confirmaciones */}
      <section className="confirmations-section">
        {loading && (
          <div className="loading">
            <p>Cargando confirmaciones...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            {error}
            <button onClick={cargarConfirmaciones} className="retry-btn">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && confirmacionesFiltradas.length === 0 && (
          <div className="empty-state">
            <p>No hay confirmaciones para mostrar</p>
          </div>
        )}

        {!loading && !error && confirmacionesFiltradas.length > 0 && (
          <div className="confirmations-list">
            {confirmacionesFiltradas.map((confirmacion) => (
              <div 
                key={confirmacion.id} 
                className={`confirmation-card ${confirmacion.asistira ? 'asistira' : 'no-asistira'}`}
              >
                <div className="confirmation-header">
                  <h3>{confirmacion.nombre_completo}</h3>
                  <span className={`status-badge ${confirmacion.asistira ? 'success' : 'danger'}`}>
                    {confirmacion.asistira ? '✓ Asistirá' : '✗ No asistirá'}
                  </span>
                </div>

                <div className="confirmation-body">
                  <div className="info-row">
                    <strong>Email:</strong>
                    <span>{confirmacion.correo_electronico}</span>
                  </div>

                  {confirmacion.telefono && (
                    <div className="info-row">
                      <strong>Teléfono:</strong>
                      <span>{confirmacion.telefono}</span>
                    </div>
                  )}

                  {confirmacion.asistira && (
                    <div className="info-row">
                      <strong>Nº Invitados:</strong>
                      <span>{confirmacion.numero_invitados} persona(s)</span>
                    </div>
                  )}

                  {confirmacion.cancion_favorita && (
                    <div className="info-row">
                      <strong>Canción:</strong>
                      <span>{confirmacion.cancion_favorita}</span>
                    </div>
                  )}

                  {confirmacion.mensaje && (
                    <div className="info-row mensaje">
                      <strong>Mensaje:</strong>
                      <p>{confirmacion.mensaje}</p>
                    </div>
                  )}

                  <div className="info-row fecha">
                    <strong>Fecha confirmación:</strong>
                    <span>{formatearFecha(confirmacion.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
