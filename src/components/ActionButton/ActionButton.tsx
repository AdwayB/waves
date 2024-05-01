import { FC, ReactNode, useState } from 'react';
import { Fab } from '@mui/material';
import styles from './action-button.module.scss';

interface ActionButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'primary' | 'secondary';
  extended?: boolean;
  onClick: () => void;
  disabled?: boolean;
  customIconBgColor?: string;
  customIconHoverColor?: string;
}

/**
 * A floating action button component.
 * Has primary and secondary types, and can be circular or extended button.
 *
 * @param {ActionButtonProps} props - The props for configuring the ActionButton.
 */
const ActionButton: FC<ActionButtonProps> = (props) => {
  const {
    children,
    className,
    type = 'primary',
    extended = false,
    onClick,
    disabled = false,
    customIconBgColor,
    customIconHoverColor,
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`${styles.actionButtonWrapper}  ${styles[type]}`}>
      <Fab
        color={type}
        className={className}
        variant={extended ? 'extended' : 'circular'}
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: isHovered ? customIconHoverColor : customIconBgColor,
          transition: 'background-color 0.3s ease-in-out',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Fab>
    </div>
  );
};

// EXAMPLE USAGE
{
  /* <ActionButton onClick={() => {}} type="primary">
  <AddIcon />
</ActionButton>; */
}

export { ActionButton, ActionButtonProps };
