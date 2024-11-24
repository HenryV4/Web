// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch banks (already present)
export const fetchBanks = (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return axios.get(`${API_BASE_URL}/banks?${params}`);
};

// Real signup functionality
export const signup = (userData) => {
    return axios.post(`${API_BASE_URL}/signup`, userData);
};

// Real login functionality
export const login = (credentials) => {
    return axios.post(`${API_BASE_URL}/login`, credentials);
};
