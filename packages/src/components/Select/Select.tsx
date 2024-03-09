import { FC, ReactNode } from 'react';
import { Box, Chip, FormControl, InputLabel, Select as MSelect, MenuItem, OutlinedInput } from '@mui/material';
import styles from './select.module.scss';

interface SelectOptionProps {
  label: string;
  value: string;
}

interface SelectProps {
  value?: string;
  onChange?: (event: unknown, child?: ReactNode) => void;
  options: SelectOptionProps[];
  label?: string;
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
      return (selected: any) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected?.map((value: any) => <Chip key={value} label={value} />)}
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
                  color: 'white',
                  '&:hover': {
                    background: '#430694',
                    color: 'white',
                  },
                },
                '& .Mui-selected': {
                  background: '#430694 !important',
                  color: 'white !important',
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
