import { FC } from 'react';
import { FormControlLabel, Checkbox as MCheckbox, CheckboxProps as MCheckboxProps } from '@mui/material';
import styles from './checkbox.module.scss';

interface CheckboxItem extends MCheckboxProps {
  label?: string;
  labelAlign?: 'top' | 'end' | 'bottom' | 'start';
  type?: 'primary' | 'secondary';
}

interface CheckboxProps {
  items: CheckboxItem[];
  direction?: 'row' | 'column';
  className?: string;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { items, direction = 'column', className } = props;

  return (
    <div className={`${styles.checkboxWrapper} ${className} ${styles[direction]}`}>
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
