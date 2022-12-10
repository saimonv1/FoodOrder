//import axios from 'axios';
import { setUserData } from '../storage/auth.storage';
import authHeader from './auth-header';
import api from './api.js';

// const URL = "https://goldfish-app-ibq9e.ondigitalocean.app/api";

// const api = axios.create({
//     baseURL: URL,
// });

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

export const logout = async (refreshToken, dispatch) => {
    //localStorage.removeItem("user");
    setUserData(null, null, dispatch);

    const res = await api.delete('/tokens', {
        refreshToken
    }, {headers: authHeader()});
    return res.data;
};

export const getUserId = async (userName) => {
    const res = await api.get(`/users/${userName}/userIds`, {headers: authHeader()});
    return res.data;
};