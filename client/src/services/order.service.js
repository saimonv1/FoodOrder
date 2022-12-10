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

export const addOrder = async (userId, dishes) => {
    const res = await api.post(`users/${userId}/orders`, {
        dishes: dishes
    }, { headers: authHeader() });
    return res.data;
}

export const deleteOrder = async (userId, orderId) => {
    const res = await api.delete(`users/${userId}/orders/${orderId}`, { headers: authHeader() });
    return res.data;
}