// src/lib/api/apiMensura.ts
"use client";

import axios from "axios";
import { getCookie } from "cookies-next";

const apiAdmin = axios.create({
  baseURL: "/mensura",   //
});

apiAdmin.interceptors.request.use((config) => {
  const token = getCookie("supervisor_token");
  if (token && typeof token === "string") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiAdmin;
