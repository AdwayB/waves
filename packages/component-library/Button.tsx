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
  const { buttonType = 'primary', size = 'sm', label = ' ' } = props;

  const getClassName = () => {
    switch (buttonType) {
      case 'primary':
        return `${styles.storybookButtonPrimary}`;
      case 'secondary':
        return `${styles.storybookButtonSecondary}`;
      case 'link':
        return `${styles.storybookButtonLink}`;
      case 'link-light':
        return `${styles.storybookButtonLinkLight}`;
      default:
        return `${styles.storybookButtonPrimary}`;
    }
  };

  return (
    <BSButton
      {...props}
      variant={buttonType === 'link-light' ? 'link' : buttonType}
      className={[`${styles.storybookButton}`, getClassName()].join(' ')}
      size={size}
    >
      {label}
    </BSButton>
  );
};

export { Button, ButtonProps };
