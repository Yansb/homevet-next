import { Calendar, Cat, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { SidebarDropdownMenu } from "./SidebarMenu";
import Link from "next/link";

const items = [
  {
    title: "Minha Area",
    buttons: [
      {
        title: "Inicio",
        icon: Home,
        url: "/home",
      },
      {
        title: "Agendamentos",
        icon: Calendar,
        url: "/agendamentos",
      },
      {
        title: "Meus Pets",
        icon: Cat,
        url: "/pets",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        {items.map((group) => (
          <SidebarGroup key={group.title} title={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.buttons.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarDropdownMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
