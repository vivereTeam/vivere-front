import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getAllEventos = async () => {
    const response = await api.get('/eventos');
    return response.data;
};

export const getEventoById = async (id) => {
    const response = await api.get(`/eventos/${id}`);
    return response.data;
};

export const createEvento = async (evento) => {
    const response = await api.post('/eventos', evento, getAuthHeader());
    return response.data;
};

export const updateEvento = async (id, evento) => {
    const response = await api.put(`/eventos/${id}`, evento, getAuthHeader());
    return response.data;
};

export const deleteEvento = async (id) => {
    const response = await api.delete(`/eventos/${id}`, getAuthHeader());
    return response.data;
};

export const getEventosByCategory = async (id_categoria) => {
    const response = await api.get(`/eventos/categoria/${id_categoria}`);
    return response.data;
};

export const searchEventos = async (termo) => {
    const response = await api.get('/eventos/search', {
        params: { q: termo },
        ...getAuthHeader(),
    });
    return response.data;
};

export const populateDB = async () => {
    const response = await api.post('/eventos/populate', {}, getAuthHeader());
    return response.data;
};

export const userLogin = async (email, password) => {
    const response = await api.post('/usuario/login', { email, password });
    return response.data;
};

export const userRegister = async (email, password, nome) => {
    const response = await api.post('/usuario/register', { email, password, nome });
    return response.data;
};

export const createAdmin = async (email, senha, nome, secretKey) => {
    const response = await api.post('/users/admin', { email, senha, nome, secretKey }, getAuthHeader());
    return response.data;
};

export const resetPassword = async (email, newPassword) => {
    const response = await api.post('/usuario/reset-password', { 
      email, 
      newPassword 
    });
    return response.data;
  };

  export const getCart = async (usuarioId) => {
    const response = await api.get(`/carrinho/${usuarioId}`, getAuthHeader());
    return response.data;
  };
  
  export const addCartItem = async (usuarioId, eventoId, quantidade) => {
    const response = await api.post(
      `/carrinho/${usuarioId}/itens`,
      { eventoId, quantidade },
      getAuthHeader()
    );
    return response.data;
  };
  
  export const updateCartItem = async (itemId, quantidade) => {
    const response = await api.put(
      `/carrinho/itens/${itemId}`,
      { quantidade },
      getAuthHeader()
    );
    return response.data;
  };
  
  export const removeCartItem = async (itemId) => {
    const response = await api.delete(
      `/carrinho/itens/${itemId}`,
      getAuthHeader()
    );
    return response.data;
  };
  
  export const clearCart = async (usuarioId) => {
    const response = await api.delete(
      `/carrinho/${usuarioId}/limpar`,
      getAuthHeader()
    );
    return response.data;
  };

export default api;