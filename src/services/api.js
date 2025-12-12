import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 segundos de timeout
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('El servidor está tardando demasiado en responder. Verifica que el backend esté ejecutándose.');
    }
    if (error.code === 'ERR_NETWORK') {
      throw new Error('No se puede conectar con el servidor. Asegúrate de que el backend esté ejecutándose en el puerto 8000.');
    }
    throw error;
  }
);

// Funciones para manejar las notas
export const obtenerNotas = async () => {
  try {
    const response = await api.get('/notas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener notas:', error);
    throw error;
  }
};

export const obtenerNota = async (id) => {
  try {
    const response = await api.get(`/notas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la nota:', error);
    throw error;
  }
};

export const crearNota = async (notaData) => {
  try {
    const response = await api.post('/notas', notaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw error;
  }
};

export const actualizarNota = async (id, notaData) => {
  try {
    const response = await api.put(`/notas/${id}`, notaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la nota:', error);
    throw error;
  }
};

export const eliminarNota = async (id) => {
  try {
    const response = await api.delete(`/notas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
    throw error;
  }
};