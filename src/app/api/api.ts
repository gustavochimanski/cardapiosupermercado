// src/lib/api.tsx

import axios from "axios";

export const api = axios.create({
  baseURL: "/api/mensura", // se mudar para produção, troca aqui
  headers: {
    "Content-Type": "application/json",
  },
});
