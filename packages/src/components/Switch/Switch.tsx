import { FC } from 'react';
import { FormControlLabel, Switch as MSwitch, SwitchProps as MSwitchProps } from '@mui/material';
import styles from './switch.module.scss';

interface SwitchProps extends MSwitchProps {
  type?: 'primary' | 'secondary';
  label?: string;
  labelAlign?: 'top' | 'end' | 'bottom' | 'start';
  className?: string;
}

/**
 * A Switch component.
 *
 * @param {SwitchProps} props - The props for the Switch component.
 */
const Switch: FC<SwitchProps> = (props) => {
  const { type = 'primary', label, labelAlign = 'end', className } = props;

  return (
    <FormControlLabel
      className={`${styles.switchWrapper} ${styles[type]}`}
      label={label}
      labelPlacement={labelAlign}
      control={<MSwitch {...props} color={type} className={className} disableRipple />}
    />
  );
};

// TODO: onChange doesn't work when type='secondary'

// EXAMPLE USAGE
//  <Switch
//    label={'Toggle Alert'}
//    checked={openCheck}
//    onChange={(e) => {
//      if (e?.target.checked) {
//        setShow(true);
//      } else {
//        setShow(false);
//      }
//    }}
//  />

export { Switch, SwitchProps };
