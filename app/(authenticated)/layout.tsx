import { AppSidebar } from "@/components/Sidebar";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col md:flex-row">
        <AppSidebar />

        <main className="bg-accent flex-1 overflow-y-auto p-4">
          <Card className="min-h-[calc(100%-3rem)] pb-16 md:pb-0">
            {children}
          </Card>
        </main>

        <MobileFooter />
      </div>
    </SidebarProvider>
  );
}
