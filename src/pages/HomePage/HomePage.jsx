import { useState } from 'react';
import confirmacionService from '../../services/confirmacion.service';
import './HomePage.css';

/**
 * Componente de Página Principal
 * Muestra la invitación de boda y el formulario de confirmación
 */
const HomePage = () => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo_electronico: '',
    telefono: '',
    asistira: true,
    numero_invitados: 1,
    cancion_favorita: '',
    mensaje: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  /**
   * Manejar cambios en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Si el usuario indica que NO asistirá, poner número de invitados en 0
    if (name === 'asistira' && !checked) {
      setFormData(prev => ({ ...prev, numero_invitados: 0 }));
    }
  };

  /**
   * Enviar confirmación de asistencia
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Convertir numero_invitados a número
      const dataToSend = {
        ...formData,
        numero_invitados: parseInt(formData.numero_invitados) || 0,
      };

      await confirmacionService.crearConfirmacion(dataToSend);
      
      setSuccess(true);
      
      // Limpiar formulario
      setFormData({
        nombre_completo: '',
        correo_electronico: '',
        telefono: '',
        asistira: true,
        numero_invitados: 1,
        cancion_favorita: '',
        mensaje: '',
      });

      // Scroll al mensaje de éxito
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Error al enviar la confirmación. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Header de la invitación */}
      <header className="wedding-header">
        <div className="header-content">
          <h1 className="couple-names">Diter & Vivian</h1>
          <p className="wedding-date">2026</p>
          <p className="wedding-tagline">Nos casamos y queremos celebrarlo contigo</p>
        </div>
        <div className="header-decoration"></div>
      </header>

      {/* Sección de información */}
      <section className="wedding-info">
        <div className="info-container">
          <div className="info-card">
            <div className="info-icon">💒</div>
            <h3>Ceremonia</h3>
            <p className="info-detail">Iglesia San José</p>
            <p className="info-time">4:00 PM</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🎉</div>
            <h3>Recepción</h3>
            <p className="info-detail">Salón de Eventos Aurora</p>
            <p className="info-time">6:00 PM</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📅</div>
            <h3>Fecha</h3>
            <p className="info-detail">Sábado</p>
            <p className="info-time">15 de Febrero, 2026</p>
          </div>
        </div>
      </section>

      {/* Mensaje personal */}
      <section className="personal-message">
        <div className="message-content">
          <h2>Nuestra Historia</h2>
          <p>
            Después de años de amor, risas y aventuras juntos, hemos decidido dar el paso más 
            importante de nuestras vidas. Queremos compartir este día especial contigo, 
            porque tu presencia es el mejor regalo que podríamos recibir.
          </p>
        </div>
      </section>

      {/* Formulario de confirmación */}
      <section className="confirmation-section">
        <div className="form-container">
          <h2 className="form-title">Confirma tu Asistencia</h2>
          
          {success && (
            <div className="alert alert-success">
              <strong>¡Gracias por confirmar!</strong> Hemos recibido tu respuesta correctamente.
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="confirmation-form">
            <div className="form-group">
              <label htmlFor="nombre_completo">
                Nombre Completo <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nombre_completo"
                name="nombre_completo"
                value={formData.nombre_completo}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo_electronico">
                Correo Electrónico <span className="required">*</span>
              </label>
              <input
                type="email"
                id="correo_electronico"
                name="correo_electronico"
                value={formData.correo_electronico}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono (opcional)</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+51 987 654 321"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="asistira"
                  checked={formData.asistira}
                  onChange={handleChange}
                />
                <span>Sí, asistiré con mucho gusto</span>
              </label>
            </div>

            {formData.asistira && (
              <>
                <div className="form-group">
                  <label htmlFor="numero_invitados">
                    Número de Personas <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="numero_invitados"
                    name="numero_invitados"
                    value={formData.numero_invitados}
                    onChange={handleChange}
                    required
                    min="1"
                    max="10"
                  />
                  <small>Incluyéndote a ti</small>
                </div>

                <div className="form-group">
                  <label htmlFor="cancion_favorita">
                    Canción Favorita (opcional)
                  </label>
                  <input
                    type="text"
                    id="cancion_favorita"
                    name="cancion_favorita"
                    value={formData.cancion_favorita}
                    onChange={handleChange}
                    placeholder="¿Qué canción te gustaría escuchar?"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje para los Novios (opcional)</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="4"
                maxLength="500"
                placeholder="Déjanos un mensaje..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Confirmación'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="wedding-footer">
        <p>Con amor, Diter & Vivian</p>
        <p className="footer-date">#DyV2026</p>
      </footer>
    </div>
  );
};

export default HomePage;
