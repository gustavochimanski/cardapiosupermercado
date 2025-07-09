"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import { User, useUser } from "@/hooks/useUser";
import { createContext, useContext, ReactNode } from "react";

type UserContextData = {
  user?: User;
  isLoading: boolean;
};

const UserContext = createContext<UserContextData>({
  user: undefined,
  isLoading: true,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("supervisor_token");

  // Salva o token se vier pela URL
  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { path: "/" }); // opcional: { secure: true, sameSite: "Lax" }
    }
  }, [token]);

  const { data: user, isLoading } = useUser();

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

export function useUserRole() {
  const { user } = useUserContext();
  return user?.role;
}
