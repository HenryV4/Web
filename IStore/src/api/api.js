// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchBanks = (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return axios.get(`${API_BASE_URL}/banks?${params}`);
};
