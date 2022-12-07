import jwt_decode from 'jwt-decode';
import { refresh } from '../services/auth.service';

export const setUserData = (accessToken, refreshToken) => {
    const decodedUser = jwt_decode(accessToken);
    const user = { ...decodedUser, accessToken: accessToken, refreshToken: refreshToken };
    localStorage.setItem("user", JSON.stringify(user));
    setTimeout(() => {
        refreshUserData(refreshToken);
    }, (decodedUser.exp - decodedUser.iat) * 1000);
};

export const getUserData = () => {
    const userData = localStorage.getItem("user");
    if(userData) {
        return JSON.parse(userData);
    }
    return null;
};

export const refreshUserData = async (refreshToken) => {
    const newAccessToken = await refresh(refreshToken);
    setUserData(newAccessToken, refreshToken);
};