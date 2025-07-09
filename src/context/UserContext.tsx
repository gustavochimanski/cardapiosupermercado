"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, ReactNode } from "react";
import Cookies from "js-cookie";
import { User, useUser } from "@/hooks/useUser";

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
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    const token = searchParams.get("supervisor_token");
    if (token) {
      console.log("🔐 Token recebido pela URL:", token);
      Cookies.set("token", token, { path: "/" });
    }
    setShouldFetch(true);
  }, [searchParams]);

  const { data: user, isLoading } = useUser();
  const value = shouldFetch ? { user, isLoading } : { user: undefined, isLoading: true };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
