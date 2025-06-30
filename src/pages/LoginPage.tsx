import { Link } from 'react-router-dom';
import LoginForm from '@/components/login/LoginForm';

const LoginPage = () => {
  return (
    <section>
      <h2>로그인</h2>
      <LoginForm />
      <Link to="/register">회원 가입</Link>
    </section>
  );
};

export default LoginPage;
