import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

// Busca todos os eventos
export const getAllEventos = async () => {
    const response = await api.get('/eventos');
    return response.data;
};

// Busca um evento pelo ID
export const getEventoById = async (id) => {
    const response = await api.get(`/eventos/${id}`);
    return response.data;
};

// Cria um novo evento
export const createEvento = async (evento) => {
    const response = await api.post('/eventos', evento);
    return response.data;
};

// Atualiza um evento existente pelo ID
export const updateEvento = async (id, evento) => {
    const response = await api.put(`/eventos/${id}`, evento);
    return response.data;
};

// Exclui um evento pelo ID
export const deleteEvento = async (id) => {
    const response = await api.delete(`/eventos/${id}`);
    return response.data;
};

// Busca eventos por categoria
export const getEventosByCategory = async (id_categoria) => {
    const response = await api.get(`/eventos/categoria/${id_categoria}`);
    return response.data;
};

// Busca eventos por termo de pesquisa
export const searchEventos = async (termo) => {
    const response = await api.get('/eventos/search', {
        params: { q: termo }
    });
    return response.data;
};

// Popula o banco de dados com eventos de teste
export const populateDB = async () => {
    const response = await api.post('/eventos/populate');
    return response.data;
};

export default api;