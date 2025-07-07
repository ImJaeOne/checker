import AdminAttendanceTable from '@/components/dashboard/AdminAttendanceTable';
import AdminDashboardSummary from '@/components/dashboard/AdminDashboardSummary';
import EmployeeDashboardSummary from '@/components/dashboard/EmployeeDashboardSummary';
import EmployeeLeaveTable from '@/components/dashboard/EmployeeLeaveTable';
import { useGetUserQuery } from '@/hooks/useUserQuery';
import { USER_ROLES } from '@/types/DTO/user.dto';

const DashboardPage = () => {
  // 추후 zustand로 관리할 예정
  const {
    data: user,
    isFetching,
    isError,
  } = useGetUserQuery('e74cc771-3495-460c-9409-0e1d51c542a2');

  if (isFetching) {
    return <>Loading...</>;
  }

  if (isError || !user) {
    return <>Error...</>;
  }

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
