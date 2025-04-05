"use client";

import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/stores/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { initialize } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initialize();

    return () => {
      unsubscribe();
    };
  }, [initialize]);

  return <>{children}</>;
}
