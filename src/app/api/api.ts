// src/lib/api.ts
import axios from "axios";
import { getCookie } from "cookies-next";

export const api = axios.create({ /* … */ });

api.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token && config.headers) {
    config.headers.set?.("Authorization", `Bearer ${token}`);
  }
  return config;
});
