import { ChangeEvent, FC } from 'react';
import styles from './number.module.scss';
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

interface InputNumberProps {
  type?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  id?: string;
  label?: string;
  defaultValue?: number;
  value: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  prefixText?: string;
  suffixText?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
}

const InputNumber: FC<InputNumberProps> = (props) => {
  const {
    type = 'primary',
    size = 'small',
    id = 'input-number',
    label,
    defaultValue,
    value,
    onChange,
    disabled = false,
    placeholder,
    prefixText,
    suffixText,
    error = false,
    helperText = ' ',
    className,
  } = props;

  const style: 'prefix' | 'suffix' | 'plain' = prefixText ? 'prefix' : suffixText ? 'suffix' : 'plain';

  switch (style) {
    case 'prefix':
      return (
        <div className={`${styles.inputPrefixWrapper} ${styles[type]}`}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={error}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
              size={size}
              id={id}
              startAdornment={<InputAdornment position="start">{prefixText}</InputAdornment>}
              label={label}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              className={className}
            />
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </div>
      );

    case 'suffix':
      return (
        <div className={`${styles.inputSuffixWrapper} ${styles[type]}`}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={error}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
              size={size}
              id={id}
              endAdornment={<InputAdornment position="end">{suffixText}</InputAdornment>}
              label={label}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              className={className}
            />
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </div>
      );

    default:
      return (
        <div className={`${styles.inputWrapper} ${styles[type]}`}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={error}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
              size={size}
              id={id}
              label={label}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              className={className}
            />
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </div>
      );
  }
};

// EXAMPLE USAGE
{
  /* <div style={{ width: '300px' }}>
  <InputNumber
    label="Set Count"
    value={count}
    onChange={(e) => {
      const inputValue = e.target.value.trim();
      if (inputValue === '') {
        setCount(0);
      } else {
        setCount(parseInt(inputValue));
      }
    }}
  />
</div>; */
}

export { InputNumber, InputNumberProps };
