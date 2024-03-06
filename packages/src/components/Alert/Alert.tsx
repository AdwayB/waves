import { FC, ReactNode } from 'react';
import { AlertProps as BSAlertProps, Alert as BSAlert } from 'react-bootstrap';
import styles from './alert.module.scss';
import { Icon } from '../IconComponents';

interface AlertProps extends BSAlertProps {
  variant?: 'primary' | 'success' | 'danger' | 'warning';
  className?: string;
  children: ReactNode;
}

const Alert: FC<AlertProps> = (props) => {
  const {
    variant = 'primary',
    dismissible = true,
    closeLabel = 'Close',
    show,
    onClose = () => {},
    className,
    children,
  } = props;
  return (
    <div className={styles.alertContainer}>
      <BSAlert
        variant={variant}
        dismissible={dismissible}
        closeLabel={closeLabel}
        show={show}
        onClose={onClose}
        className={`${styles.alert} ${styles[variant]} ${className}`}
      >
        <>
          <Icon type={variant === 'primary' ? null : variant} />
          {children}
        </>
      </BSAlert>
    </div>
  );
};

export { Alert, AlertProps };
