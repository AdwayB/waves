import { FC } from 'react';
import styles from './radio.module.scss';
import { FormControlLabel, Radio as MRadio, RadioProps as MRadioProps, RadioGroup } from '@mui/material';

interface RadioItemProps extends Omit<MRadioProps, 'color'> {
  type?: 'primary' | 'secondary';
  label?: string;
  labelAlign?: 'top' | 'end' | 'bottom' | 'start';
}

interface RadioProps {
  items: RadioItemProps[];
  name?: string;
  value: string;
  onChange: (event?: React.ChangeEvent<HTMLInputElement>, value?: string) => void;
  defaultValue?: string;
  direction?: 'row' | 'column';
  className?: string;
}

/**
 * A Radio group component.
 * Can be grouped vertically or horizontally.
 * Has primary and secondary themes.
 *
 * @param {RadioProps} props - The props for the radio component.
 */
const Radio: FC<RadioProps> = (props) => {
  const { items, name, value, onChange, defaultValue, direction, className } = props;
  return (
    <RadioGroup
      name={name}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      className={`${styles.radioWrapper} ${className} ${styles[direction ?? 'row']}`}
    >
      {items?.map((item, index) => (
        <FormControlLabel
          label={item.label}
          labelPlacement={item.labelAlign ?? 'end'}
          key={index}
          value={item.value}
          className={styles[item.type ?? 'primary']}
          control={<MRadio key={index} value={item.value} color={item?.type ?? 'primary'} disableRipple />}
        />
      ))}
    </RadioGroup>
  );
};

// EXAMPLE USAGE
{
  /* <Radio
  items={[
    {
      value: 'open',
      type: 'primary',
      label: 'Primary Alert Open',
    },
    {
      value: 'close',
      type: 'secondary',
      label: 'Secondary Alert Close',
    },
  ]}
  value={openCheck ? 'open' : 'close'}
  onChange={(e) => {
    if (e?.target.value == 'open') {
      setShow(true);
      console.log('open');
    } else {
      setShow(false);
      console.log('close');
    }
  }}
/>; */
}

export { Radio, RadioItemProps, RadioProps };
