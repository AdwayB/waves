import { FC } from 'react';
import styles from './error.module.scss';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface ErrorProps {
  message?: string;
  navigateTo?: string;
}

/**
 * A custom Error page with customizable message and CTA button.
 *
 * @param navigateTo - The URL to navigate to on CTA click.
 *
 * @param {ErrorProps} props - The props for configuring the Error Page.
 */
const Error: FC<ErrorProps> = (props) => {
  const { message, navigateTo = '/' } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <span className={styles.errorHeading}>Error!</span>
        <span className={styles.errorText}>{message ?? 'Page not found!'}</span>
        <Button
          label="Go Home"
          buttontype="primary"
          onClick={() => setTimeout(() => navigate(navigateTo), 200)}
          className={styles.errorButton}
        />
      </div>
    </div>
  );
};

export { Error, ErrorProps };
