import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export default function AppSidebarExample() {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar onLogout={handleLogout} />
      </div>
    </SidebarProvider>
  );
}
