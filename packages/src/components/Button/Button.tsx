import { FC, ReactNode } from 'react';
import { Button as MButton, ButtonProps as MButtonProps } from '@mui/material';
import styles from './button.module.scss';

interface ButtonProps extends Omit<MButtonProps, 'style'> {
  label: ReactNode;
  buttonType?: 'primary' | 'secondary';
  onClick: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = (props) => {
  const { variant = 'contained', buttonType = 'primary', label = ' ', onClick, className } = props;

  const getWrapperClassName = () => {
    if (!!variant) {
      switch (variant) {
        case 'text':
          return `${styles.button} ${styles[variant]} ${styles.buttonWrapper}`;
        default:
          return `${styles.button} ${styles[buttonType ?? '']} ${styles[variant]} ${styles.buttonWrapper}`;
      }
    }
    return `${styles.button} ${styles[buttonType ?? '']} ${styles[variant]} ${styles.buttonWrapper}`;
  };

  return (
    <div className={getWrapperClassName()}>
      <MButton {...props} variant={variant} color={buttonType} className={className} onClick={onClick}>
        {label}
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
