import { FC, ReactNode } from 'react';
import { Collapse, Alert as MAlert, AlertProps as MAlertProps } from '@mui/material';
import styles from './alert.module.scss';
import { Close } from '@mui/icons-material';

interface AlertProps extends MAlertProps {
  visible: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A floating alert component.
 * Has themes for info, warning, error, and success.
 *
 * @param {AlertProps} props - The props for configuring the ActionButton.
 */
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

// Example Usage
{
  /* <Alert
  severity="warning"
  visible={show}
  onClose={(e) => {
    e.stopPropagation();
    setShow(false);
  }}
>
  Sample Alert Here
</Alert>; */
}

export { Alert, AlertProps };
