import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "https://mensuraapi.com.br", // se mudar para produção, troca aqui
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor que injeta o token no header Authorization
api.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // busca o token salvo pelo TokenHandler
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
