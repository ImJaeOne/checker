import MainLayout from '@/components/layouts/MainLayout';
import AttendancePage from '@/pages/AttendancePage';
import DashboardPage from '@/pages/DashboardPage';
import EmployeesPage from '@/pages/Employees';
import LeavePage from '@/pages/LeavePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute roles={['admin', 'employee']}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'attendance',
        element: (
          <ProtectedRoute roles={['employee']}>
            <AttendancePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'leave',
        element: (
          <ProtectedRoute roles={['employee']}>
            <LeavePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'employees',
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
