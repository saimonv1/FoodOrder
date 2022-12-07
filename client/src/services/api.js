import axios from 'axios';

const api = axios.create({
    baseURL: "https://goldfish-app-ibq9e.ondigitalocean.app/api",
});

export const getLocations = async () => {
    const res = await api.get(`/locations`, {});
    return res.data;
};

export const getMenus = async (locationId) => {
    const res = await api.get(`/locations/${locationId}/menus`);
    return res.data;
};

export const getDishes = async (locationId, menuId) => {
    const res = await api.get(`/locations/${locationId}/menus/${menuId}/dishes`);
    return res.data;
};