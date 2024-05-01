import { FC, ReactNode } from 'react';
import { Button as MButton, ButtonProps as MButtonProps, CircularProgress } from '@mui/material';
import styles from './button.module.scss';

interface ButtonProps extends Omit<MButtonProps, 'style'> {
  label: ReactNode;
  buttontype?: 'primary' | 'secondary';
  onClick: () => void;
  className?: string;
  buttonloading?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    variant = 'contained',
    buttontype = 'primary',
    label = ' ',
    onClick,
    className,
    buttonloading = false,
  } = props;

  const getWrapperClassName = () => {
    if (!!variant) {
      switch (variant) {
        case 'text':
          return `${styles.button} ${styles[variant]} ${styles.buttonWrapper}`;
        default:
          return `${styles.button} ${styles[buttontype ?? '']} ${styles[variant]} ${styles.buttonWrapper}`;
      }
    }
    return `${styles.button} ${styles[buttontype ?? '']} ${styles[variant]} ${styles.buttonWrapper}`;
  };

  return (
    <div className={getWrapperClassName()}>
      <MButton {...props} variant={variant} color={buttontype} className={className} onClick={onClick}>
        {buttonloading ? <CircularProgress size={28} color="inherit" /> : label}
      </MButton>
    </div>
  );
};

// Example Usage
//  <Button
//    label={
//      <>
//          Toggle Alert
//      </>
//    }
//    buttonType="primary"
//    onClick={() => {
//      setShow(!show);
//    }}
//  />;

export { Button, ButtonProps };
