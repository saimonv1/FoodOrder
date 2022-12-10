//import axios from 'axios';
import authHeader from './auth-header';
import api from './api.js';

// const URL = "https://goldfish-app-ibq9e.ondigitalocean.app/api";

// const api = axios.create({
//     baseURL: URL,
// });

export const getDishes = async (locationId, menuId) => {
    const res = await api.get(`/locations/${locationId}/menus/${menuId}/dishes`);
    return res.data;
};

export const addDish = async (locationId, menuId, name, image, description, price) => {
    const res = await api.post(`/locations/${locationId}/menus/${menuId}/dishes`, {
        name,
        image,
        description,
        price
    }, {headers: authHeader()});

    return res.data;
};

export const getDish = async (locationId, menuId, dishId) => {
    const res = await api.get(`/locations/${locationId}/menus/${menuId}/dishes/${dishId}`);
    return res.data;
};

export const updateDish = async (locationId, menuId, dishId, name, image, description, price) => {
    const res = await api.patch(`/locations/${locationId}/menus/${menuId}/dishes/${dishId}`, {
        name,
        image,
        description,
        price
    }, {headers: authHeader()});
    return res.data;
}

export const deleteDish = async (locationId, menuId, dishId) => {
    const res = await api.delete(`/locations/${locationId}/menus/${menuId}/dishes/${dishId}`, {headers: authHeader()});
    return res.data;
}