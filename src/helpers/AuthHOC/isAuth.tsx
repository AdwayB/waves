import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, setIsAuthenticated, setUser } from '../../redux';
import { getUserCookie } from '../Cookies';

const isAuth = <T extends object>(WrappedComponent: ComponentType<T>) => {
  const AuthenticatedComponent = (props: T) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuthenticated);

    if (!isAuth) {
      const user = getUserCookie();
      if (!user) {
        return <Navigate to="/" />;
      }
      dispatch(setUser(user));
      dispatch(setIsAuthenticated(true));
      return <WrappedComponent {...props} />;
    }
    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `Auth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return AuthenticatedComponent;
};

export { isAuth };
