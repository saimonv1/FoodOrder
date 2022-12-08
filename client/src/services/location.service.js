import axios from 'axios';
import authHeader from './auth-header';

const URL = "https://goldfish-app-ibq9e.ondigitalocean.app/api";

const api = axios.create({
    baseURL: URL,
});

export const getLocations = async () => {
    const res = await api.get(`/locations`, {});
    return res.data;
};

export const addLocation = async (country, city, address) => {
    const res = await api.post(`/locations`, {
        country,
        city,
        address
    }, {headers: authHeader()});

    return res.data;
};

export const getLocation = async (locationId) => {
    const res = await api.get(`/locations/${locationId}`);
    return res.data;
};

export const updateLocation = async (locationId, country, city, address) => {
    const res = await api.patch(`/locations/${locationId}`, {
        country,
        city,
        address
    }, {headers: authHeader()});
    return res.data;
}

export const deleteLocation = async (locationId) => {
    const res = await api.delete(`/locations/${locationId}`, {headers: authHeader()});
    return res.data;
}