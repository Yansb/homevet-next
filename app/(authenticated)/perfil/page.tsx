"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { ProfileUploadAvatar } from "./componets/profileUploadAvatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function Page() {
  const { logout } = useAuthStore();
  const { user } = useUserStore();
  const router = useRouter();

  return (
    <>
      <CardHeader className="flex flex-col items-center md:items-start">
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Atualize Suas informações</CardDescription>
      </CardHeader>
      <CardContent className="flex h-full flex-col place-content-between items-center gap-4">
        <>
          <ProfileUploadAvatar />
          {user ? (
            <p className="font-semibold text-gray-700">{user.name}</p>
          ) : (
            <Skeleton className="h-6 w-32" />
          )}
        </>
        <Button
          variant="destructive"
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          <LogOut /> Sair
        </Button>
      </CardContent>
    </>
  );
}
