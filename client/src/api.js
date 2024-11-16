import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_ENDPOINT,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;