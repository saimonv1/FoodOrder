import api from "./api.js";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const setUserRole = async (userId, role) => {
    const res = await api.patch(`/users/${userId}/roles`, {
        role
    });
    return res.data;
};
