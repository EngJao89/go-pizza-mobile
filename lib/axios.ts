import axios, { type AxiosInstance } from "axios";
import { Platform } from "react-native";

const defaultBaseURL =
  Platform.OS === "android"
    ? "http://192.168.100.9:8080/"
    : "http://localhost:8080/";
const baseURL = process.env.EXPO_PUBLIC_API_URL ?? defaultBaseURL;
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
      console.warn(
        "[API] Sem resposta do servidor. Base URL:", baseURL,
        "| Confira se o backend está rodando e se a URL está correta para este ambiente (emulador: 10.0.2.2, celular: IP da sua máquina)."
      );
    }
    return Promise.reject(error);
  }
);

export default api;
