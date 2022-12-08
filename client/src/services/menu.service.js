import axios from 'axios';
import authHeader from './auth-header';

const URL = "https://goldfish-app-ibq9e.ondigitalocean.app/api";

const api = axios.create({
    baseURL: URL,
});

export const getMenus = async (locationId) => {
    const res = await api.get(`/locations/${locationId}/menus`);
    return res.data;
};

export const addMenu = async (locationId, name, image, description) => {
    const res = await api.post(`/locations/${locationId}/menus`, {
        name,
        image,
        description
    }, {headers: authHeader()});

    return res.data;
};

export const getMenu = async (locationId, menuId) => {
    const res = await api.get(`/locations/${locationId}/menus/${menuId}`);
    return res.data;
};

export const updateMenu = async (locationId, menuId, name, image, description) => {
    const res = await api.patch(`/locations/${locationId}/menus/${menuId}`, {
        name,
        image,
        description
    }, {headers: authHeader()});
    return res.data;
}

export const deleteMenu = async (locationId, menuId) => {
    const res = await api.delete(`/locations/${locationId}/menus/${menuId}`, {headers: authHeader()});
    return res.data;
}