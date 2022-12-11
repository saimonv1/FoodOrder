import { setUserData } from "../storage/auth.storage";
import api from "./api.js";

export const login = async (email, password) => {
  const res = await api.post("/tokens", {
    email,
    password,
  });
  return res.data;
};

export const register = async (email, username, password) => {
  const res = await api.post("/users", {
    email,
    username,
    password,
  });
  return res.data;
};

export const refresh = async (token) => {
  const res = await api.put("/tokens", {
    token,
  });
  return res.data;
};

export const logout = async (token, userId, dispatch) => {
  try {
    const res = await api.delete(`/tokens/${token}/users/${userId}`);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  } finally {
    setUserData(null, null, dispatch);
  }
};

export const getUserId = async (userName) => {
  const res = await api.get(`/users/${userName}/userIds`);
  return res.data;
};
