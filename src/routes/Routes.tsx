import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Error, FullScreenLoading } from '../components';

const SignupOrLogin = lazy(() => import('../modules').then((m) => ({ default: m.SignupOrLogin })));
const Signup = lazy(() => import('../modules').then((m) => ({ default: m.Signup })));
const Login = lazy(() => import('../modules').then((m) => ({ default: m.Login })));
const Layout = lazy(() => import('../modules').then((m) => ({ default: m.Layout })));

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <Routes>
        <Route path="/" element={<SignupOrLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/*" element={<Layout />} />
        <Route path="/error" element={<Error message="Page not found" />} />
        <Route path="*" element={<Error message="Page not found" />} />
      </Routes>
    </Suspense>
  );
};

export { AppRoutes };
