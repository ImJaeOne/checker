import { Outlet } from 'react-router-dom';
import AppSidebar from '@/components/layouts/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 p-6 overflow-y-auto gap-5">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
