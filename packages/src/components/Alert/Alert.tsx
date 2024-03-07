import { FC, ReactNode } from 'react';
import { Collapse, Alert as MAlert, AlertProps as MAlertProps } from '@mui/material';
import styles from './alert.module.scss';
import { Close } from '@mui/icons-material';

interface AlertProps extends MAlertProps {
  visible: boolean;
  className?: string;
  children: ReactNode;
}

const Alert: FC<AlertProps> = (props) => {
  const { visible, severity = 'info', variant = 'outlined', onClose = () => {}, className, children } = props;

  return (
    <div className={styles.alertContainer}>
      <Collapse in={visible}>
        <MAlert
          action={<Close className={styles.close} onClick={(e) => onClose(e)} />}
          severity={severity}
          variant={variant}
          onClose={onClose}
          className={`${styles.alert} ${styles[severity ?? '']} ${className}`}
        >
          {children}
        </MAlert>
      </Collapse>
    </div>
  );
};

export { Alert, AlertProps };
