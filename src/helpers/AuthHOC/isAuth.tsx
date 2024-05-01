import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../helpers';

const isAuth = <T extends object>(WrappedComponent: ComponentType<T>) => {
  const AuthenticatedComponent = (props: T) => {
    const token = getCookie('jwt');

    if (!token) {
      return <Navigate to="/" />;
    }
    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `Auth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return AuthenticatedComponent;
};

export { isAuth };
