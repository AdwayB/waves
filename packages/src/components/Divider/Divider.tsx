import { FC } from 'react';
import styles from './divider.module.scss';
import { Divider as MDivider } from '@mui/material';

interface DividerProps {
  type?: 'primary' | 'secondary';
  alignment?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'middle';
  className?: string;
}

const Divider: FC<DividerProps> = (props) => {
  const { type = 'primary', alignment = 'horizontal', variant = 'fullWidth', className } = props;
  return (
    <div className={`${styles.dividerWrapper} ${styles[type]}`}>
      <MDivider variant={variant} orientation={alignment} className={className} />
    </div>
  );
};

// EXAMPLE USAGE
// test divider primary
// <Divider />
// test divider secondary
// <Divider type="secondary" />

export { Divider, DividerProps };
