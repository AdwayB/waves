import { FC } from 'react';
import styles from './divider.module.scss';
import { Divider as MDivider } from '@mui/material';

interface DividerProps {
  type?: 'primary' | 'secondary';
  alignment?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'middle';
  className?: string;
}

/**
 * A styled Divider component.
 * Has primary and secondary themes and horizontal and vertical alignments.
 * Can have a full width or centre aligned middle width variant.
 *
 * @param {DividerProps} props - The props for configuring the Divider.
 */
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
