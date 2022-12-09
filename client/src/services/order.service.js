import axios from 'axios';
import authHeader from './auth-header';

const URL = "https://goldfish-app-ibq9e.ondigitalocean.app/api";

const api = axios.create({
    baseURL: URL,
});

export const getOrders = async (userId) => {
    const res = await api.get(`users/${userId}/orders`, {headers: authHeader()});
    return res.data;
};