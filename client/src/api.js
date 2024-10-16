import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3001`, // colocar nas variáveis de ambientes
});

export default api;
