import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import SITE_MAP from '@/constants/siteMap.constant';
import { useUserStore } from '@/store/user.store';
import type { UserRole } from '@/types/DTO/user.dto';

type ProtectedRouteProps = {
  children: JSX.Element;
  roles: UserRole[];
};

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to={SITE_MAP.LOGIN} replace />;
  }
  if (!roles.includes(user.role)) {
    return <div>접근 권한 없음</div>;
  }

  return children;
};

export default ProtectedRoute;
