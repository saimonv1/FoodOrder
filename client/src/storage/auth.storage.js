import jwt_decode from 'jwt-decode';
import { refresh } from '../services/auth.service';

export const getUserData = () => {
    const userData = localStorage.getItem("user");
    if(userData) {
        // if(jwt_decode(userData.accessToken).exp >= Date.now() / 1000) {
        //     refreshUserData(userData.refreshToken)
        //     .then(() => {
        //         return getUserData();
        //     });
        // }
        return JSON.parse(userData);
    }
    return null;
};

export const refreshUserData = async (refreshToken) => {
    const newAccessToken = await refresh(refreshToken);
    if(newAccessToken) {
        setUserData(newAccessToken, refreshToken);
    } else {
        setUserData(null, null);
    }
};

export const setUserData = (accessToken, refreshToken) => {
    if(!accessToken && !refreshToken) {
        localStorage.removeItem("user");
    }
    const decodedUser = jwt_decode(accessToken);
    const user = { ...decodedUser, accessToken: accessToken, refreshToken: refreshToken };
    localStorage.setItem("user", JSON.stringify(user));
    setTimeout(() => {
        refreshUserData(refreshToken);
    }, (decodedUser.exp - decodedUser.iat) * 1000);
};
