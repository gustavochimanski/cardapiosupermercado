import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type User = { id: string; name: string; role: "admin" | "user" };

export function useUser() {
  const isDev = process.env.NODE_ENV === "development";
  const mockRole = process.env.NEXT_PUBLIC_MOCK_ROLE as User["role"] | undefined;

  return useQuery<User, Error>({
    // 1️⃣ queryKey
    queryKey: ["currentUser"],
    // 2️⃣ queryFn
    queryFn: async () => {
      if (isDev && mockRole) {
        return { id: "stub", name: "Dev", role: mockRole };
      }
      const { data } = await axios.get<User>("/api/me");
      return data;
    },
    // 3️⃣ outras opções
    staleTime: 1000 * 60 * 5,
    // initialData pode ser usado pra mockar dados imediatamente
    initialData: isDev && mockRole ? { id: "stub", name: "Dev", role: mockRole } : undefined,
  });
}
