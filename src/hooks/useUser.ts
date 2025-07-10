import apiAdmin from "@/app/api/apiAdmin";
import { useQuery } from "@tanstack/react-query";

export interface User {
  role: string
}

// src/hooks/useUser.ts
export function useUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => apiAdmin.get<{ id: string; role: string }>("/mensura/auth/me"),
    select: res => res.data,
    refetchOnWindowFocus: false,
  });
}
