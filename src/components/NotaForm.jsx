import { useState, useEffect } from 'react';
import '../App.css';

const NotaForm = ({ notaEditando, onGuardar, onCancelar }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [etiquetaInput, setEtiquetaInput] = useState('');
  const [etiquetas, setEtiquetas] = useState([]);

  useEffect(() => {
    if (notaEditando) {
      setTitulo(notaEditando.titulo);
      setContenido(notaEditando.contenido);
      setEtiquetas(notaEditando.etiquetas || []);
    } else {
      limpiarFormulario();
    }
  }, [notaEditando]);

  const limpiarFormulario = () => {
    setTitulo('');
    setContenido('');
    setEtiquetas([]);
    setEtiquetaInput('');
  };

  const handleAgregarEtiqueta = (e) => {
    e.preventDefault();
    if (etiquetaInput.trim() && !etiquetas.includes(etiquetaInput.trim())) {
      setEtiquetas([...etiquetas, etiquetaInput.trim()]);
      setEtiquetaInput('');
    }
  };

  const handleEliminarEtiqueta = (index) => {
    const nuevasEtiquetas = [...etiquetas];
    nuevasEtiquetas.splice(index, 1);
    setEtiquetas(nuevasEtiquetas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) {
      alert('El título y el contenido son obligatorios');
      return;
    }

    const notaData = {
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      etiquetas: etiquetas
    };

    onGuardar(notaData);
    if (!notaEditando) {
      limpiarFormulario();
    }
  };

  const handleCancelar = () => {
    limpiarFormulario();
    onCancelar();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="titulo">
          <i className="fas fa-heading"></i> Título
        </label>
        <input
          type="text"
          id="titulo"
          className="form-input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe el título de tu nota"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contenido">
          <i className="fas fa-file-alt"></i> Contenido
        </label>
        <textarea
          id="contenido"
          className="form-input"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribe el contenido de tu nota..."
          required
          rows="6"
        />
      </div>

      <div className="form-group">
        <label>
          <i className="fas fa-tags"></i> Etiquetas
        </label>
        <div className="tags-input">
          {etiquetas.map((etiqueta, index) => (
            <div key={index} className="tag">
              {etiqueta}
              <button
                type="button"
                onClick={() => handleEliminarEtiqueta(index)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
        <div className="add-tag">
          <input
            type="text"
            className="form-input"
            value={etiquetaInput}
            onChange={(e) => setEtiquetaInput(e.target.value)}
            placeholder="Añade una etiqueta"
            onKeyPress={(e) => e.key === 'Enter' && handleAgregarEtiqueta(e)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAgregarEtiqueta}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="button-group">
        <button type="submit" className="btn btn-primary">
          <i className={`fas ${notaEditando ? 'fa-save' : 'fa-plus'}`}></i>
          {notaEditando ? ' Actualizar Nota' : ' Crear Nota'}
        </button>
        
        {notaEditando && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancelar}
          >
            <i className="fas fa-times"></i> Cancelar
          </button>
        )}
        
        {!notaEditando && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={limpiarFormulario}
          >
            <i className="fas fa-broom"></i> Limpiar
          </button>
        )}
      </div>
    </form>
  );
};

export default NotaForm;