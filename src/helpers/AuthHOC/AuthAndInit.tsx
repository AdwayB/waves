import { ComponentType, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated, setIsAuthenticated, setUser } from '../../redux';
import { getUserCookie } from '../Cookies';
import { useUpdateUserEventsState } from '../../hooks';
import { Navigate } from 'react-router-dom';

const AuthAndInit = <T extends object>(WrappedComponent: ComponentType<T>) => {
  const AuthenticatedComponent = (props: T) => {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState<string | null>(useSelector(selectCurrentUser)?.UserId ?? null);
    const isAuth = useSelector(selectIsAuthenticated);

    useEffect(() => {
      if (!userId || !isAuth) {
        const user = getUserCookie();
        if (!user) return;
        dispatch(setUser(user));
        setUserId(user.UserId ?? null);
        dispatch(setIsAuthenticated(true));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, userId]);

    useUpdateUserEventsState(userId ?? '');

    if (!isAuth && !userId) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `Auth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return AuthenticatedComponent;
};

export { AuthAndInit };
