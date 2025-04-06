"use client";

import { Calendar, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const footerItems = [
  {
    title: "Início",
    icon: Home,
    url: "/home",
  },
  {
    title: "Agendamentos",
    icon: Calendar,
    url: "/agendamentos",
  },
  {
    title: "Perfil",
    icon: User,
    url: "/perfil",
  },
];

export function MobileFooter() {
  const pathname = usePathname();

  return (
    <div className="border-sidebar-border bg-sidebar fixed bottom-0 left-0 z-50 w-full border-t md:hidden">
      <div className="flex justify-around">
        {footerItems.map((item) => {
          const isActive = pathname.startsWith(item.url);
          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex flex-col items-center px-3 py-2",
                isActive
                  ? "text-sidebar-accent-foreground"
                  : "text-sidebar-foreground",
              )}
            >
              <item.icon className="size-6" />
              <span className="mt-1 text-xs">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
