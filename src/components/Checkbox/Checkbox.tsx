import { FC } from 'react';
import { FormControlLabel, FormLabel, Checkbox as MCheckbox, CheckboxProps as MCheckboxProps } from '@mui/material';
import styles from './checkbox.module.scss';

interface CheckboxItem extends MCheckboxProps {
  label?: string;
  labelAlign?: 'top' | 'end' | 'bottom' | 'start';
  type?: 'primary' | 'secondary';
}

interface CheckboxProps {
  groupLabel?: string;
  items: CheckboxItem[];
  direction?: 'row' | 'column';
  className?: string;
}

/**
 * A checkbox group component.
 * Has primary and secondary themes.
 *
 * @param {CheckboxProps} props - The props for configuring the Checkbox.
 */
const Checkbox: FC<CheckboxProps> = (props) => {
  const { groupLabel, items, direction = 'column', className } = props;

  return (
    <div className={`${styles.checkboxWrapper} ${className} ${styles[direction]}`}>
      <FormLabel className={styles.label}>{groupLabel}</FormLabel>
      {items.map((item, index) => (
        <FormControlLabel
          key={index}
          className={styles[item.type ?? 'primary']}
          control={
            <MCheckbox
              {...item}
              disableRipple
              color={item?.type ?? 'primary'}
              key={index}
              className={`${styles.checkbox} ${item?.className}`}
            />
          }
          label={item?.label}
          labelPlacement={item?.labelAlign ?? 'end'}
        />
      ))}
    </div>
  );
};

// EXAMPLE USAGE
{
  /* 
<Checkbox
  direction="row"
  items={[
    {
      type: 'primary',
      checked: openCheck,
      label: 'Primary Alert Open',
      onClick: () => {
        setShow(true);
      },
    },
    {
      type: 'secondary',
      checked: closeCheck,
      label: 'Secondary Alert Close',
      onClick: () => {
        setShow(false);
      },
    },
  ]}
/>; 
*/
}

export { Checkbox, CheckboxItem, CheckboxProps };
