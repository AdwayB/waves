import { FC, ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { TimeField as MTimeField, TimeFieldProps as MTimeFieldProps } from '@mui/x-date-pickers';
import styles from './timeField.module.scss';

interface TimeFieldProps extends MTimeFieldProps<Dayjs> {
  label?: ReactNode;
  id?: string;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText?: ReactNode;
  format?: string;
  value: Dayjs;
  onChange: (value: Dayjs | null, context?: unknown) => void;
  onError?: (error: string | null, value: Dayjs | null) => void;
}

/**
 * A controlled TimeField component.
 * Has configurable format and keyboard accessibility.
 *
 * @param format - The format for displaying the time. Defaults to 'HH:mm'.
 *
 * @param {TimeFieldProps} props - The props for configuring the TimeField.
 */
const TimeField: FC<TimeFieldProps> = (props) => {
  const {
    label,
    id = 'time-picker',
    name,
    readOnly = false,
    required = false,
    disabled = false,
    helperText,
    format = 'HH:mm',
    value,
    onChange,
    onError,
  } = props;

  return (
    <div className={styles.timeFieldWrapper}>
      <MTimeField
        {...props}
        label={label}
        id={id}
        name={name}
        readOnly={readOnly}
        required={required}
        disabled={disabled}
        helperText={helperText}
        format={format}
        value={value}
        onChange={onChange}
        onError={onError}
        ampm
        fullWidth
        formatDensity="spacious"
      />
    </div>
  );
};

export { TimeField };
