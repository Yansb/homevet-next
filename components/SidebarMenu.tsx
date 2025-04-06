"use client";

import { ChevronsUpDown, Dog, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { Skeleton } from "./ui/skeleton";
import { useGetLoggedUser } from "@/services/userService";

export function SidebarDropdownMenu() {
  const { firebaseUser, logout } = useAuthStore();
  const { user } = useUserStore();
  const router = useRouter();

  const { isLoading } = useGetLoggedUser();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-24" />
      </div>
    );
  }

  if (!firebaseUser || !user) {
    return null;
  }

  const splittedUserName = user.name?.split(" ") ?? [""];
  const fallBackName =
    splittedUserName[0][0] + splittedUserName[splittedUserName.length - 1][0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={user?.profilePicture ?? ""}
                  alt={user?.name ?? ""}
                />
                <AvatarFallback className="rounded-lg">
                  {fallBackName ?? ""}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem
              className="hover:bg-accent cursor-pointer"
              onClick={() => router.push("/perfil")}
            >
              <User />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-accent cursor-pointer"
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
            >
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
