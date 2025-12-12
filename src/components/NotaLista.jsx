import '../App.css';

const NotaLista = ({ notas, onEditar, onEliminar }) => {
  const formatearFecha = (fechaString) => {
    try {
      const fecha = new Date(fechaString);
      
      // Formatear la fecha manualmente
      const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      return fecha.toLocaleDateString('es-ES', opciones);
    } catch (error) {
      return fechaString;
    }
  };

  return (
    <div className="notes-grid">
      {notas.map((nota) => (
        <div key={nota.id} className="note-card">
          <div className="note-header">
            <h3 className="note-title">{nota.titulo}</h3>
          </div>
          
          <div className="note-date">
            <i className="far fa-calendar"></i> 
            Creada: {formatearFecha(nota.fecha_creacion)}
          </div>
          
          <div className="note-date">
            <i className="far fa-edit"></i> 
            Actualizada: {formatearFecha(nota.fecha_actualizacion)}
          </div>
          
          <div className="note-content">
            {nota.contenido.split('\n').map((linea, index) => (
              <p key={index}>{linea}</p>
            ))}
          </div>
          
          {nota.etiquetas && nota.etiquetas.length > 0 && (
            <div className="note-tags">
              {nota.etiquetas.map((etiqueta, index) => (
                <span key={index} className="note-tag">
                  #{etiqueta}
                </span>
              ))}
            </div>
          )}
          
          <div className="note-actions">
            <button
              className="edit-btn"
              onClick={() => onEditar(nota)}
            >
              <i className="fas fa-edit"></i> Editar
            </button>
            
            <button
              className="delete-btn"
              onClick={() => onEliminar(nota.id)}
            >
              <i className="fas fa-trash"></i> Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotaLista;