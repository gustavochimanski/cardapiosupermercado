// context/UserContext.tsx
"use client";

import { User, useUser } from "@/hooks/useUser";
import { createContext, useContext, ReactNode } from "react";

type UserContextData = {
  user?: User;
  isLoading: boolean;
};

const UserContext = createContext<UserContextData>({ user: undefined, isLoading: true });

export function UserProvider({ children }: { children: ReactNode }) {
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
