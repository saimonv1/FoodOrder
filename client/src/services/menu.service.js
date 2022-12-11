import api from "./api.js";

export const getMenus = async (locationId) => {
  const res = await api.get(`/locations/${locationId}/menus`);
  return res.data;
};

export const addMenu = async (locationId, name, image, description) => {
  const res = await api.post(`/locations/${locationId}/menus`, {
    name,
    image,
    description,
  });

  return res.data;
};

export const getMenu = async (locationId, menuId) => {
  const res = await api.get(`/locations/${locationId}/menus/${menuId}`);
  return res.data;
};

export const updateMenu = async (
  locationId,
  menuId,
  name,
  image,
  description
) => {
  const res = await api.patch(`/locations/${locationId}/menus/${menuId}`, {
    name,
    image,
    description,
  });
  return res.data;
};

export const deleteMenu = async (locationId, menuId) => {
  const res = await api.delete(`/locations/${locationId}/menus/${menuId}`);
  return res.data;
};
