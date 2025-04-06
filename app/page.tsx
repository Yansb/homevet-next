"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function RootPage() {
  const router = useRouter();
  const { firebaseUser, loading } = useAuthStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Só executamos a lógica de redirecionamento quando o loading for false
    // e ainda não tivermos iniciado um redirecionamento
    if (!loading && !isRedirecting) {
      setIsRedirecting(true);

      // Usamos setTimeout para garantir que o redirecionamento ocorra após o React completar o ciclo de renderização
      setTimeout(() => {
        if (firebaseUser) {
          router.replace("/home");
        } else {
          router.replace("/login");
        }
      }, 0);
    }
  }, [firebaseUser, loading, router, isRedirecting]);

  // Exibindo um estado de carregamento até que o redirecionamento aconteça
  if (loading || isRedirecting) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium">Carregando...</h2>
          <p className="text-sm text-gray-500">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  return null;
}
