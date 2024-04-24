import { FC, ReactNode } from 'react';
import { Chip } from '../Chip';
import { Box, FormControl, InputLabel, Select as MSelect, MenuItem, OutlinedInput } from '@mui/material';
import styles from './select.module.scss';
import { Colors } from '../../helpers/Colors';

interface SelectOptionProps {
  label: string;
  value: string;
}

interface SelectProps {
  value?: string[];
  onChange?: (event: unknown, child?: ReactNode) => void;
  options: SelectOptionProps[];
  label?: ReactNode;
  multiple?: boolean;
  input?: ReactNode;
  style?: 'chip' | 'text';
  className?: string;
  renderValue?: (value: unknown) => ReactNode;
}

const Select: FC<SelectProps> = (props) => {
  const { value, onChange, multiple, renderValue, options, label, style, className } = props;

  const getRenderValue = () => {
    if (!!renderValue) {
      return renderValue;
    } else if (style === 'chip') {
      // eslint-disable-next-line react/display-name
      return (selected: string[]) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected?.map((value: string) => <Chip key={value} label={value} />)}
        </Box>
      );
    }
  };

  return (
    <div className={styles.selectWrapper}>
      <FormControl>
        <InputLabel id="component-select">{label}</InputLabel>
        <MSelect
          labelId="component-select"
          id="select"
          multiple={multiple}
          value={value}
          onChange={onChange}
          renderValue={getRenderValue()}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          className={`${className} ${styles.select}`}
          MenuProps={{
            PaperProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  color: Colors.white,
                  '&:hover': {
                    background: Colors.wavesViolet,
                    color: Colors.white,
                  },
                },
                '& .Mui-selected': {
                  background: `${Colors.wavesViolet} !important`,
                  color: `${Colors.white} !important`,
                },
                '& .MuiMenu-list': {
                  background: Colors.wavesDarkViolet,
                  height: '20rem',
                  overflow: 'auto',
                },
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </MSelect>
      </FormControl>
    </div>
  );
};

// EXAMPLE USAGE
{
  /* <Select
  label={'Test This Too'}
  value={openCheck ? 'open' : 'close'}
  onChange={(e: any) => {
    if (e?.target.value == 'open') {
      setShow(true);
    } else {
      setShow(false);
    }
  }}
  options={[
    {
      value: 'open',
      label: 'open',
    },
    {
      value: 'close',
      label: 'close',
    },
  ]}
/>; */
}

export { Select, SelectProps, SelectOptionProps };
