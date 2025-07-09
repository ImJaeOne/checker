import AdminAttendanceTable from '@/components/dashboard/AdminAttendanceTable';
import AdminDashboardSummary from '@/components/dashboard/AdminDashboardSummary';
import EmployeeDashboardSummary from '@/components/dashboard/EmployeeDashboardSummary';
import EmployeeLeaveTable from '@/components/dashboard/EmployeeLeaveTable';
import { useUserStore } from '@/store/user.store';
import { USER_ROLES } from '@/types/DTO/user.dto';

const DashboardPage = () => {
  const user = useUserStore((state) => state.user);

  if (user.role === USER_ROLES.ADMIN) {
    return (
      <>
        <AdminDashboardSummary />
        <AdminAttendanceTable />
      </>
    );
  }

  if (user.role === USER_ROLES.EMPLOYEE) {
    return (
      <>
        <EmployeeDashboardSummary user={user} />
        <EmployeeLeaveTable />
      </>
    );
  }
};

export default DashboardPage;
