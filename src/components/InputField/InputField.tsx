import { ChangeEvent, FC, useState } from 'react';
import styles from './inputfield.module.scss';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface InputFieldProps {
  type?: 'text' | 'password' | 'textarea';
  style?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  id?: string;
  label?: string;
  defaultValue?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  readOnly?: boolean;
  isSearch?: boolean;
  maxRows?: number;
  className?: string;
}

/**
 * An InputField component.
 * Can be of text or password types.
 * Can also be used as a search field with no outline.
 *
 * @param {InputFieldProps} props - The props for configuring the InputField.
 */
const InputField: FC<InputFieldProps> = (props) => {
  const {
    style = 'primary',
    type = 'text',
    size = 'small',
    id = type === 'text' ? 'input-text' : 'input-password',
    label,
    defaultValue,
    value,
    onChange,
    disabled = false,
    placeholder,
    error = false,
    helperText = ' ',
    required = false,
    readOnly = false,
    isSearch = false,
    maxRows = 9,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState<'text' | 'password' | 'textarea'>(type);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
    setInputType((type) => (type === 'password' ? 'text' : 'password'));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  switch (type) {
    case 'text':
      return (
        <div className={`${styles.inputFieldWrapper} ${styles[style]} ${isSearch && styles.search}`}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={error}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
              size={size}
              id={id}
              name={id}
              label={label}
              type={type}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              className={className}
              readOnly={readOnly}
            />
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </div>
      );

    case 'password':
      return (
        <div className={`${styles.inputFieldWrapper} ${styles[style]}`}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={error}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
              size={size}
              id={id}
              name={id}
              label={label}
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              className={className}
              type={inputType}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </div>
      );

    case 'textarea':
      return (
        <div className={`${styles.inputFieldWrapper} ${styles[style]} ${isSearch && styles.search}`}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={error}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
              id={id}
              name={id}
              label={label}
              multiline
              maxRows={maxRows}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              className={className}
              readOnly={readOnly}
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
        <InputField
          label="Set Banner Text"
          value={bannerText}
          onChange={(e) => {
            setBannerText(e.target.value);
          }}
        />
      </div>
      <div style={{ width: '300px' }}>
        <InputField
          type="password"
          style="secondary"
          label="Set Banner Text"
          value={bannerText}
          onChange={(e) => {
            setBannerText(e.target.value);
          }}
        />
      </div> */
}

export { InputField, InputFieldProps };
