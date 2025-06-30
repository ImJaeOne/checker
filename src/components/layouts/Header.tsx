import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-300 text-white flex justify-between">
      <Link to="/dashboard">checker</Link>
      <ul className="flex gap-5">
        <li>
          <Link to="/dashboard">대시보드</Link>
        </li>
        <li>
          <Link to="/attendance">출퇴근 관리</Link>
        </li>
        <li>
          <Link to="/leave">연차 관리</Link>
        </li>
        <li>
          <Link to="employees">직원 관리</Link>
        </li>
        {/* 로그인 작업 완료 후 삭제 */}
        <li>
          <Link to="/login">로그인</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
