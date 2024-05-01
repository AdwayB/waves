import { FC, ReactNode } from 'react';
import { Badge as MBadge, BadgeProps as MBadgeProps } from '@mui/material';
import styles from './badge.module.scss';

interface BadgeProps extends Omit<MBadgeProps, 'content' | 'color'> {
  type: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'light' | 'dark';
  content?: string | number;
  className?: string;
  children: ReactNode;
}

/**
 * A badge component..
 * Can have a standard, primary, secondary, success, error, warning, light, or dark theme.
 * Can have a circular or rounded rectangular shape.
 *
 * @param {BadgeProps} props - The props for configuring the Badge.
 */
const Badge: FC<BadgeProps> = (props) => {
  const { content, type, max, showZero, variant = 'dot', className, children } = props;
  return (
    <MBadge
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      showZero={showZero}
      badgeContent={content}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color={type as any}
      max={max}
      variant={variant}
      className={`${styles.badge} ${styles[type ?? '']} ${className}`}
    >
      {children}
    </MBadge>
  );
};

// Example Usage
//  <Button
//    label={
//      <>
//        <Badge content={count} variant="standard" type="success">
//          Toggle Alert
//        </Badge>
//      </>
//    }
//    buttonType="primary"
//    onClick={() => {
//      setShow(!show);
//    }}
//  />;

export { Badge, BadgeProps };
