import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getAllEventos = async () => {
    const response = await api.get('/eventos');
    return response.data;
};

export const getEventoById = async (id) => {
    const response = await api.get(`/eventos/${id}`);
    return response.data;
};

export const createEvento = async (evento) => {
    const response = await api.post('/eventos', evento);
    return response.data;
};

export const updateEvento = async (id, evento) => {
    const response = await api.put(`/eventos/${id}`, evento);
    return response.data;
};

export const deleteEvento = async (id) => {
    const response = await api.delete(`/eventos/${id}`);
    return response.data;
};

export const getEventosByCategory = async (id_categoria) => {
    const response = await api.get(`/eventos/categoria/${id_categoria}`);
    return response.data;
};

export const searchEventos = async (termo) => {
    const response = await api.get('/eventos/search', {
        params: { q: termo }
    });
    return response.data;
};

export const populateDB = async () => {
    const response = await api.post('/eventos/populate');
    return response.data;
};

export const userLogin = async (email, senha) => {
    const response = await api.post('/users/login', { email, senha });
    return response.data;
};

export const userRegister = async (email, senha, nome) => {
    const response = await api.post('/users/register', { email, senha, nome });
    return response.data;
};

export const createAdmin = async (email, senha, nome, secretKey) => {
    const response = await api.post('/users/admin', { email, senha, nome, secretKey });
    return response.data;
};

export default api;