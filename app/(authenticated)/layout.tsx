import { AppSidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="bg-accent flex-1 overflow-y-auto p-4">
          <Card>{children}</Card>
        </main>
      </div>
    </SidebarProvider>
  );
}
