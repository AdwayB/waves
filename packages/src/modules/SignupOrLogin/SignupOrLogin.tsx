import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './signupOrLogin.module.scss';
import { Button, Loading } from '../../components';
import { getCookie } from '../../helpers';

const SignupOrLogin = () => {
  const navigate = useNavigate();
  const jwt = getCookie('jwt');

  useEffect(() => {
    if (jwt) navigate('/user');
  });

  return jwt ? (
    <Loading loading />
  ) : (
    <>
      <div className={styles.signupLoginContainer}>
        <span className={styles.logo}>waves</span>
        <pre className={styles.text}>A comprehensive Event Management solution.</pre>
        <pre className={styles.subText}>Please Sign Up or Log In to continue!</pre>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonWrapper}>
            <Button label="Sign Up" buttonType="primary" onClick={() => navigate('/signup')} />
          </div>
          <div className={styles.buttonWrapper}>
            <Button label="Login" buttonType="secondary" onClick={() => navigate('/login')} />
          </div>
        </div>
      </div>
    </>
  );
};

export { SignupOrLogin };
