import { Route, Routes } from 'react-router-dom';
import { SignupOrLogin, Signup, Login, Layout } from '../modules';
import { Error } from '../components';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupOrLogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/*" element={<Layout />} />
      <Route path="/error" element={<Error message="Page not found" />} />
      <Route path="*" element={<Error message="Page not found" />} />
    </Routes>
  );
};

export { AppRoutes };
