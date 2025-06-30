import RegisterForm from '@/components/register/registerForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <section>
      <h2>회원가입</h2>
      <RegisterForm />
      <Link to="/login">로그인</Link>
    </section>
  );
};

export default RegisterPage;
