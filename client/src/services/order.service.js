import api from "./api.js";

export const getOrders = async (userId) => {
  const res = await api.get(`users/${userId}/orders`);
  return res.data;
};

export const addOrder = async (userId, dishes) => {
  const res = await api.post(`users/${userId}/orders`, {
    dishes: dishes,
  });
  return res.data;
};

export const deleteOrder = async (userId, orderId) => {
  const res = await api.delete(`users/${userId}/orders/${orderId}`);
  return res.data;
};
