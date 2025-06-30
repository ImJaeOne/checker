import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
