import api from './api';

export async function getVehicles() {
    const response = await api.get('/veiculos');
    return response.data;
}

export async function getVehicleById(id) {
    const response = await api.get(`/veiculos/${id}`);
    return response.data;
}

export async function createVehicle(vehicle) {
    const response = await api.post('/veiculos', vehicle);
    return response.data;
}

export async function updateVehicle(id, vehicle) {
    const response = await api.put(`/veiculos/${id}`, vehicle);
    return response.data;
}

export async function deleteVehicle(id) {
    const response = await api.delete(`/veiculos/${id}`);
    return response.data;
}