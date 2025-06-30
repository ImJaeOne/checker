import AdminAttendanceTable from '@/components/dashboard/AdminAttendanceTable';
import AdminDashboardSummary from '@/components/dashboard/AdminDashboardSummary';
import EmployeeDashboardSummary from '@/components/dashboard/EmployeeDashboardSummary';
import EmployeeLeaveHistory from '@/components/dashboard/EmployeeLeaveHistory';
import { mockUsers, USER_ROLES } from '@/mocks/users';

const DashboardPage = () => {
  const [employee, admin] = mockUsers;

  if (admin.role === USER_ROLES.ADMIN) {
    return (
      <>
        <AdminDashboardSummary />
        <AdminAttendanceTable />
      </>
    );
  }

  if (employee.role === USER_ROLES.EMPLOYEE) {
    return (
      <>
        <EmployeeDashboardSummary />
        <EmployeeLeaveHistory />
      </>
    );
  }
};

export default DashboardPage;
