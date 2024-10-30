import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BOOKINGS_ENDPOINT,
});

export default api;
