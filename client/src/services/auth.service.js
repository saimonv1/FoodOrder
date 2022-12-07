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

export const login = async (email, password) => {
    const res = await api.post('/tokens', {
        email,
        password
    });
    return res.data;
};

export const register = async (email, username, password) => {
    const res = await api.post('/users', {
        email,
        username,
        password
    });
    return res.data;
};

export const refresh = async (token) => {
    const res = await api.put('/tokens', {
        token
    });
    return res.data;
};

export const logout = async (accessToken, refreshToken) => {
    localStorage.removeItem("user");
    await authApi.delete('/tokens', {
        accessToken,
        refreshToken
    });
};