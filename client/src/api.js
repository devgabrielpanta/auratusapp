import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    'authorization': `Bearer ${localStorage.getItem("access_token")}`
  },
});

export default api;