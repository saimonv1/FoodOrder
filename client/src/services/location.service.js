import api from "./api.js";

export const getLocations = async () => {
  const res = await api.get(`/locations`, {});
  return res.data;
};

export const addLocation = async (country, city, address) => {
  const res = await api.post(`/locations`, {
    country,
    city,
    address,
  });

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
    address,
  });
  return res.data;
};

export const deleteLocation = async (locationId) => {
  const res = await api.delete(`/locations/${locationId}`);
  return res.data;
};
