import axios, { type AxiosInstance } from "axios";

const baseURL = "http://localhost:8080/";
const timeout = 10000;

const api: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message ?? error.message;
      console.warn(`[API] ${status}: ${message}`);
    } else if (error.request) {
      console.warn("[API] Sem resposta do servidor. Verifique a conexão.");
    }
    return Promise.reject(error);
  }
);

export default api;
