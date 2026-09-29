import api from './api';

export async function getClients() {
    const response = await api.get('/clientes');
    return response.data;
}

export async function getClientById(id) {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
}

export async function createClient(client) {
    const response = await api.post('/clientes', client);
    return response.data;
}

export async function updateClient(id, client) {
    const response = await api.put(`/clientes/${id}`, client);
    return response.data;
}

export async function deleteClient(id) {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
}