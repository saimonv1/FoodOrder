import axios from 'axios';
import authHeader from './auth-header';

const URL = "https://goldfish-app-ibq9e.ondigitalocean.app/api";

const api = axios.create({
    baseURL: URL,
});

const authApi = axios.create({
    baseURL: URL,
    headers: authHeader()
})

export const getMenus = async (locationId) => {
    const res = await api.get(`/locations/${locationId}/menus`);
    return res.data;
};

export const addMenu = async (locationId, name, image, description) => {
    const res = await authApi.post(`/locations/${locationId}/menus`, {
        name,
        image,
        description
    });

    return res.data;
};

export const getMenu = async (locationId, menuId) => {
    const res = await api.get(`/locations/${locationId}/menus/${menuId}`);
    return res.data;
};

export const updateMenu = async (locationId, menuId, name, image, description) => {
    const res = await authApi.patch(`/locations/${locationId}/menus/${menuId}`, {
        name,
        image,
        description
    });
    return res.data;
}

export const deleteMenu = async (locationId, menuId) => {
    const res = await authApi.delete(`/locations/${locationId}/menus/${menuId}`);
    return res.data;
}