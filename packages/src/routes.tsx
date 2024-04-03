import { Route, Routes } from 'react-router-dom';
import { SignupOrLogin } from './modules';
import { Error } from './components';
import { Signup } from './modules/SignupOrLogin/SignupScreen';
import { Login } from './modules/SignupOrLogin/LoginScreen';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupOrLogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error message="Page not found" />} />
    </Routes>
  );
};

export { AppRoutes };
