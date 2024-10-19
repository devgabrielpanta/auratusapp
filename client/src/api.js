import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BOOKINGS_ENDPOINT, // colocar nas variáveis de ambientes
});

export default api;
