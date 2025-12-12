import { useState, useEffect } from 'react';
import { obtenerNotas, crearNota, actualizarNota, eliminarNota } from './services/api';
import NotaForm from './components/NotaForm';
import NotaLista from './components/NotaLista';
import './App.css';

function App() {
  const [notas, setNotas] = useState([]);
  const [notaEditando, setNotaEditando] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    try {
      setCargando(true);
      const data = await obtenerNotas();
      setNotas(data);
      setMensaje({ texto: '', tipo: '' });
    } catch (error) {
      console.error('Error al cargar notas:', error);
      setMensaje({ 
        texto: 'Error al cargar las notas. Asegúrate de que el servidor FastAPI está ejecutándose en el puerto 8000.', 
        tipo: 'error' 
      });
    } finally {
      setCargando(false);
    }
  };

  const handleGuardarNota = async (notaData) => {
    try {
      let respuesta;
      if (notaEditando) {
        respuesta = await actualizarNota(notaEditando.id, notaData);
        setNotas(notas.map(nota => 
          nota.id === notaEditando.id ? respuesta : nota
        ));
        setMensaje({ texto: 'Nota actualizada exitosamente', tipo: 'success' });
      } else {
        respuesta = await crearNota(notaData);
        setNotas([respuesta, ...notas]);
        setMensaje({ texto: 'Nota creada exitosamente', tipo: 'success' });
      }
      setNotaEditando(null);
    } catch (error) {
      console.error('Error al guardar nota:', error);
      setMensaje({ 
        texto: error.message || (notaEditando ? 'Error al actualizar la nota' : 'Error al crear la nota'), 
        tipo: 'error' 
      });
    }
  };

  const handleEditarNota = (nota) => {
    setNotaEditando(nota);
  };

  const handleEliminarNota = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      return;
    }

    try {
      await eliminarNota(id);
      setNotas(notas.filter(nota => nota.id !== id));
      setMensaje({ texto: 'Nota eliminada exitosamente', tipo: 'success' });
    } catch (error) {
      console.error('Error al eliminar nota:', error);
      setMensaje({ texto: 'Error al eliminar la nota', tipo: 'error' });
    }
  };

  const handleCancelarEdicion = () => {
    setNotaEditando(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1><i className="fas fa-sticky-note"></i> Aplicación de Notas</h1>
        <p>Crea, edita y organiza tus notas de manera fácil y rápida</p>
      </header>

      {mensaje.texto && (
        <div className={`message ${mensaje.tipo}-message`}>
          {mensaje.texto}
        </div>
      )}

      <main className="main-content">
        <div className="form-panel">
          <h2>
            <i className={`fas ${notaEditando ? 'fa-edit' : 'fa-plus-circle'}`}></i>
            {notaEditando ? ' Editar Nota' : ' Nueva Nota'}
          </h2>
          <NotaForm 
            notaEditando={notaEditando}
            onGuardar={handleGuardarNota}
            onCancelar={handleCancelarEdicion}
          />
        </div>

        <div className="notes-panel">
          <h2><i className="fas fa-list"></i> Tus Notas</h2>
          {cargando ? (
            <div className="loading-message">
              <p><i className="fas fa-spinner fa-spin"></i> Cargando notas...</p>
            </div>
          ) : notas.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No hay notas aún. ¡Crea tu primera nota!</p>
            </div>
          ) : (
            <NotaLista 
              notas={notas}
              onEditar={handleEditarNota}
              onEliminar={handleEliminarNota}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;