import { mockUsers, type UserRole } from '@/mocks/users';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: JSX.Element;
  roles: UserRole[];
};

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  // 추후엔 useAuth로 user 정보 가져오기
  // zustand로 유저 정보 관리
  const [admin, employee] = mockUsers;

  if (!admin) {
    return <Navigate to="login" replace />;
  }
  if (!roles.includes(admin.role)) {
    return <div>접근 권한 없음</div>;
  }

  return children;
};

export default ProtectedRoute;
