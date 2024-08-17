import { useNavigate } from 'react-router-dom';
import styles from './signupOrLogin.module.scss';
import { Button, Loading } from '../../components';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux';
import { useEffect } from 'react';

const SignupOrLogin = () => {
  const navigate = useNavigate();
  const isUserAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate('/user');
    }
  }, [navigate, isUserAuthenticated]);

  return isUserAuthenticated ? (
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
