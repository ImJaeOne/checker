import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <div>LoginPage</div>
      <div className="flex flex-col">
        <Link to="/register">회원 가입</Link>
        <Link to="/dashboard">대시 보드</Link>
      </div>
    </>
  );
};

export default LoginPage;
