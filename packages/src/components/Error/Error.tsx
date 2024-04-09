import { FC } from 'react';
import styles from './error.module.scss';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface ErrorProps {
  message?: string;
}

const Error: FC<ErrorProps> = (props) => {
  const navigate = useNavigate();
  const { message } = props;

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <span className={styles.errorHeading}>Error!</span>
        <span className={styles.errorText}>{message ?? 'Page not found!'}</span>
        <Button
          label="Go Home"
          buttonType="primary"
          onClick={() => setTimeout(() => navigate('/'), 200)}
          className={styles.errorButton}
        />
      </div>
    </div>
  );
};

export { Error, ErrorProps };
