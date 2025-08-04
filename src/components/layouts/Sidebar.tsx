import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useUserStore } from '@/store/user.store';
import { useGetAttendanceQuery } from '@/hooks/useAttendanceQuery';
import SidebarNavigation from '@/components/layouts/SidebarNavigation';
import UserDropdown from '@/components/layouts/UserDropdown';

const AppSidebar = () => {
  const user = useUserStore((state) => state.user);
  const isNotAdmin = user.role !== 'admin';

  const {
    data: attendanceState,
    isPending,
    isError,
  } = useGetAttendanceQuery(user.id);

  return (
    <Sidebar>
      <SidebarHeader className="text-2xl font-bold">Checker</SidebarHeader>
      <SidebarContent>
        <SidebarNavigation isNotAdmin={isNotAdmin} />
      </SidebarContent>
      <SidebarFooter>
        {isPending ? (
          '사용자 정보를 불러오는 중'
        ) : isError ? (
          '사용자 정보를 불러올 수 없음'
        ) : (
          <UserDropdown user={user} attendanceState={attendanceState} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
