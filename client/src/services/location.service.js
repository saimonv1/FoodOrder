import axios from 'axios';
import authHeader from './auth-header';

const URL = "https://goldfish-app-ibq9e.ondigitalocean.app/api";

const api = axios.create({
    baseURL: URL,
});

const authApi = axios.create({
    baseURL: URL,
    headers: authHeader(),
});

export const getLocations = async () => {
    const res = await api.get(`/locations`, {});
    return res.data;
};

export const addLocation = async (country, city, address) => {
    const res = await authApi.post(`/locations`, {
        country,
        city,
        address
    });

    return res.data;
};

export const getLocation = async (locationId) => {
    const res = await api.get(`/locations/${locationId}`);
    return res.data;
};

export const updateLocation = async (locationId, country, city, address) => {
    const res = await authApi.patch(`/locations/${locationId}`, {
        country,
        city,
        address
    });
    return res.data;
}

export const deleteLocation = async (locationId) => {
    const res = await authApi.delete(`/locations/${locationId}`);
    return res.data;
}