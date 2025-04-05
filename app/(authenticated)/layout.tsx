import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
