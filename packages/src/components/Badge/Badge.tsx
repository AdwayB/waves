import { FC, ReactNode } from 'react';
import { Badge as MBadge, BadgeProps as MBadgeProps } from '@mui/material';
import styles from './badge.module.scss';

interface BadgeProps extends Omit<MBadgeProps, 'content' | 'color'> {
  type: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'light' | 'dark';
  content?: string | number;
  className?: string;
  children: ReactNode;
}

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
      color={type as any}
      max={max}
      variant={variant}
      className={`${styles.badge} ${styles[type ?? '']} ${className}`}
    >
      {children}
    </MBadge>
  );
};

export { Badge, BadgeProps };
