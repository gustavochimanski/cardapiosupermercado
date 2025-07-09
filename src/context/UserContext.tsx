"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/hooks/useUser";

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
  const [tokenHandled, setTokenHandled] = useState(false);

  useEffect(() => {
    const token = searchParams.get("supervisor_token");
    if (token) {
      console.log("🔐 Token recebido pela URL:", token);
      Cookies.set("token", token, { path: "/" });
    }
    setTokenHandled(true);
  }, [searchParams]);

  // ⚠️ Só chama o hook `useUser()` depois que token foi processado
  const { data: user, isLoading } = tokenHandled
    ? require("@/hooks/useUser").useUser()
    : { data: undefined, isLoading: true };

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
