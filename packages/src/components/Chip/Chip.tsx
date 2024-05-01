import { FC, ReactElement } from 'react';
import styles from './chip.module.scss';
import { Chip as MChip } from '@mui/material';

interface ChipProps {
  type?: 'primary' | 'secondary';
  avatar?: ReactElement;
  deleteIcon?: ReactElement;
  label: string;
  disabled?: boolean;
  onDelete?: () => void;
  style?: 'filled' | 'outlined';
  className?: string;
}

/**
 * A Chip component.
 * Can display an Avatar Component.
 * Has filled and outlined styles and primary and secondary themes.
 *
 * @param {ChipProps} props - The props for configuring the Chip.
 */
const Chip: FC<ChipProps> = (props) => {
  const {
    type = 'primary',
    avatar,
    deleteIcon,
    label,
    disabled = false,
    style = 'filled',
    onDelete,
    className,
  } = props;

  const getClassName = () => {
    switch (style) {
      case 'filled':
        return `${styles.chipWrapper} ${styles[type]}`;
      case 'outlined':
        return `${styles.chipWrapper} ${styles.outlined}`;
      default:
        return `${styles.chipWrapper} ${styles[type]}`;
    }
  };

  return (
    <div className={getClassName()}>
      <MChip
        color={type}
        variant={style}
        avatar={avatar}
        deleteIcon={deleteIcon}
        label={label}
        disabled={disabled}
        onDelete={onDelete}
        className={className}
      />
    </div>
  );
};

export { Chip, ChipProps };
