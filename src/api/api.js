import axios from 'axios';

export const API_URL = 'http://localhost:4444';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchExcursionDetails = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/excursions/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const addExcursion = async (excursionData, token) => {
try {
    const response = await axios.post(`${API_URL}/admin/add`, excursionData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
} catch (error) {
    throw error.response.data;
}
};

export const updateExcursion = async (id, excursionData, token) => {
    try {
        const response = await axios.put(`${API_URL}/admin/excursions/${id}`, excursionData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteExcursion = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/excursions/delete/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchExcursions = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/all`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error.response.data
    }
}