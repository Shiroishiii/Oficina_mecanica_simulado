import api from './api';

export async function getServiceOrders() {
    const response = await api.get('/ordens-servico');
    return response.data;
}

export async function getServiceOrderById(id) {
    const response = await api.get(`/ordens-servico/${id}`);
    return response.data;
}

export async function createServiceOrder(order) {
    const response = await api.post('/ordens-servico', order);
    return response.data;
}

export async function updateServiceOrder(id, order) {
    const response = await api.put(`/ordens-servico/${id}`, order);
    return response.data;
}

export async function deleteServiceOrder(id) {
    const response = await api.delete(`/ordens-servico/${id}`);
    return response.data;
}