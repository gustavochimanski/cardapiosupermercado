// src/lib/api.tsx

import axios from "axios";

export const api = axios.create({
  baseURL: "https://mensuraapi.com.br", // se mudar para produção, troca aqui
  headers: {
    "Content-Type": "application/json",
  },
});
