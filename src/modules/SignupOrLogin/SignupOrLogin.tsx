import { useNavigate } from 'react-router-dom';
import styles from './signupOrLogin.module.scss';
import { Button, Loading } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, setIsAuthenticated, setUser } from '../../redux';
import { useEffect } from 'react';
import { getUserCookie } from '../../helpers';

const SignupOrLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUserAuthenticated = useSelector(selectIsAuthenticated);
  const user = getUserCookie();

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate('/user');
    } else if (user) {
      dispatch(setUser(user));
      dispatch(setIsAuthenticated(true));
    }
  }, [dispatch, isUserAuthenticated, navigate, user]);

  return user ? (
    <Loading loading />
  ) : (
    <>
      <div className={styles.signupLoginContainer}>
        <span className={styles.logo}>waves</span>
        <pre className={styles.text}>A comprehensive Event Management solution.</pre>
        <pre className={styles.subText}>Please Sign Up or Log In to continue!</pre>
        <div className={styles.buttonContainer}>
          <Button label="Sign Up" buttontype="primary" onClick={() => navigate('/signup')} className={styles.button} />
          <Button label="Login" buttontype="secondary" onClick={() => navigate('/login')} className={styles.button} />
        </div>
      </div>
    </>
  );
};

export { SignupOrLogin };
