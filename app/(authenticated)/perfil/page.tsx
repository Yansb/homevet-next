"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetLoggedUser } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Page() {
  const { user } = useAuthStore();
  const { data } = useGetLoggedUser();
  const fallBackName =
    user?.displayName
      ?.split(" ")
      .map((name) => name[0])
      .join("") ?? "";

  return (
    <div>
      <Avatar className="h-16 w-16 rounded-bl-full">
        <AvatarImage src={user?.photoURL ?? ""} alt={user?.displayName ?? ""} />
        <AvatarFallback className="rounded-lg">
          {fallBackName ?? ""}
        </AvatarFallback>
      </Avatar>
      <span>nome {data?.name}</span>
    </div>
  );
}
