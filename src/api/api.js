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

export const fetchExcursions = async () => {
    try {
        const response = await axios.get(`${API_URL}/excursions/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchExcursionDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/excursions/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const addExcursion = async (excursionData) => {
    try {
        const response = await axios.post(`${API_URL}/excursions`, excursionData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateExcursion = async (id, excursionData) => {
    try {
        const response = await axios.put(`${API_URL}/admin/excursions/${id}`, excursionData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteExcursion = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/excursions/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};