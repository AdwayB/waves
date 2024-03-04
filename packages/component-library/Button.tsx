import React, { FC } from 'react';
import './button.css';

/**
 * Primary UI component for user interaction
 */

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary: boolean;
  /**
   * What background color to use
   */
  backgroundColor: string;
  /**
   * How large should the button be?
   */
  size: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { primary = false, size = 'medium', backgroundColor, label = 'Button' } = props;
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor ? { backgroundColor: backgroundColor } : { backgroundColor: undefined }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  backgroundColor: undefined,
  primary: false,
  size: 'medium',
  onClick: undefined,
};

export { Button };
