import { api } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("/mensura/auth/token");
      return data;
    },
  });
}
