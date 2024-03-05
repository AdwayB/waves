import { FC } from 'react';
import { Button as BSButton, ButtonProps as BSButtonProps } from 'react-bootstrap';
import styles from './button.module.scss';

interface ButtonProps extends BSButtonProps {
  label: string;
  buttonType: 'primary' | 'secondary' | 'link' | 'link-light';
  size?: 'sm' | 'lg';
  onClick: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { buttonType = 'primary', size = 'lg', label = ' ' } = props;

  const getClassName = () => {
    switch (buttonType) {
      case 'primary':
        return `${styles.buttonPrimary}`;
      case 'secondary':
        return `${styles.buttonSecondary}`;
      case 'link':
        return `${styles.buttonLink}`;
      case 'link-light':
        return `${styles.buttonLinkLight}`;
      default:
        return `${styles.buttonPrimary}`;
    }
  };

  return (
    <BSButton
      {...props}
      variant={buttonType === 'link-light' ? 'link' : buttonType}
      className={[`${styles.button}`, getClassName()].join(' ')}
      size={size}
    >
      {label}
    </BSButton>
  );
};

export { Button, ButtonProps };
