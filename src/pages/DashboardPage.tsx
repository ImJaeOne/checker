import AdminDashboardSummary from '@/components/dashboard/AdminDashboardSummary';
import EmployeeDashboardSummary from '@/components/dashboard/EmployeeDashboardSummary';
import { mockUsers, USER_ROLES } from '@/mocks/users';

const DashboardPage = () => {
  const [admin, employee] = mockUsers;

  if (admin.role === USER_ROLES.ADMIN) {
    return <AdminDashboardSummary />;
  }

  if (admin.role === USER_ROLES.EMPLOYEE) {
    return <EmployeeDashboardSummary />;
  }
};

export default DashboardPage;
