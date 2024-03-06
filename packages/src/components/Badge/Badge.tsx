import { FC, ReactNode } from 'react';
import styles from './badge.module.scss';

interface BadgeProps {
  type?: 'primary' | 'secondary' | 'danger' | 'warning' | 'light' | 'dark';
  pill?: boolean;
  className?: string;
  children: ReactNode;
}

const getClassName = (type?: string, pill?: boolean, className?: string) => {
  if (pill) {
    return `${styles.badge} ${styles[type ?? '']} ${styles.pill} ${className}`;
  }
  return `${styles.badge} ${styles[type ?? '']} ${className}`;
};

const Badge: FC<BadgeProps> = (props) => {
  const { type = 'primary', pill = true, className, children } = props;
  return (
    <div className={styles.badgeContainer}>
      <div className={getClassName(type, pill, className)}>
        <div className={styles.badgeContent}>{children}</div>
      </div>
    </div>
  );
};

export { Badge, BadgeProps };
