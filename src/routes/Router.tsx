import MainLayout from '@/components/layouts/MainLayout';
import AttendancePage from '@/pages/AttendancePage';
import DashboardPage from '@/pages/DashboardPage';
import EmployeesPage from '@/pages/Employees';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoute';
import SITE_MAP from '@/constants/siteMap.constant';
import LeaveRequestPage from '@/pages/LeaveRequestPage';
import LeaveApprovalPage from '@/pages/LeaveApprovalPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={SITE_MAP.LOGIN} replace />,
  },
  {
    path: SITE_MAP.LOGIN,
    element: <LoginPage />,
  },
  {
    path: SITE_MAP.REGISTER,
    element: <RegisterPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: SITE_MAP.DASHBOARD,
        element: (
          <ProtectedRoute roles={['admin', 'employee']}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: SITE_MAP.ATTENDANCE,
        element: (
          <ProtectedRoute roles={['admin']}>
            <AttendancePage />
          </ProtectedRoute>
        ),
      },
      {
        path: SITE_MAP.LEAVE_REQUEST,
        element: (
          <ProtectedRoute roles={['admin', 'employee']}>
            <LeaveRequestPage />
          </ProtectedRoute>
        ),
      },
      {
        path: SITE_MAP.LEAVE_APPROVAL,
        element: (
          <ProtectedRoute roles={['admin']}>
            <LeaveApprovalPage />
          </ProtectedRoute>
        ),
      },
      {
        path: SITE_MAP.EMPLOYEES,
        element: (
          <ProtectedRoute roles={['admin']}>
            <EmployeesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
