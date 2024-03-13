import { FC } from 'react';
import { Dayjs } from 'dayjs';
import styles from './date-picker.module.scss';
import {
  DateValidationError,
  DatePicker as MDatePicker,
  DateField as MDateField,
  DateCalendar as MDateCalendar,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { PickerSelectionState } from '@mui/x-date-pickers/internals';
import { actionBarSx, datePickerPopupStyles, datePickerSlotProps } from './helper';

interface DatePickerProps {
  type?: 'picker' | 'field' | 'calendar';
  style?: 'primary' | 'secondary';
  id?: string;
  label?: string;
  defaultValue?: Dayjs;
  value?: Dayjs | null;
  onChange?: (value: Dayjs, context?: unknown) => void;
  onCalendarChange?: (
    value: Dayjs,
    selectionState?: PickerSelectionState,
    selectedView?: 'day' | 'month' | 'year',
  ) => void;
  format?: string;
  shouldDisableDate?: (date: Dayjs) => boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  maxDate?: Dayjs;
  minDate?: Dayjs;
  readOnly?: boolean;
  required?: boolean;
  size?: 'small' | 'medium';
  clearable?: boolean;
  className?: string;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const {
    type = 'picker',
    style = 'primary',
    id = type === 'picker' ? 'input-date-picker' : type === 'field' ? 'input-date-field' : 'input-date-calendar',
    label,
    defaultValue,
    value,
    onChange,
    onCalendarChange,
    format = 'DD/MM/YYYY',
    shouldDisableDate,
    disabled = false,
    error = false,
    helperText = ' ',
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    readOnly = false,
    required = false,
    size = 'small',
    clearable = true,
    className,
  } = props;

  const handleChange = (date: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
    if (onChange) {
      onChange(date as Dayjs, context);
    }
  };

  const handleCalendarChange = (
    value: Dayjs,
    selectionState?: PickerSelectionState,
    selectedView?: 'day' | 'month' | 'year',
  ) => {
    if (onCalendarChange) {
      onCalendarChange(value, selectionState, selectedView);
    }
  };

  switch (type) {
    case 'picker':
      return (
        <div className={`${styles.datePickerWrapper} ${styles[style]}`}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={error}>
            <MDatePicker
              label={label}
              readOnly={readOnly}
              defaultValue={defaultValue}
              value={value}
              onChange={handleChange}
              format={format}
              shouldDisableDate={shouldDisableDate}
              disabled={disabled}
              disableFuture={disableFuture}
              disablePast={disablePast}
              maxDate={maxDate}
              minDate={minDate}
              className={className}
              sx={datePickerPopupStyles()}
              closeOnSelect
              slots={{}}
              slotProps={{
                actionBar: {
                  actions: ['clear', 'today'],
                  sx: actionBarSx,
                },
                ...datePickerSlotProps(helperText, clearable),
              }}
            />
          </FormControl>
        </div>
      );
    case 'field':
      return (
        <div className={`${styles.dateFieldWrapper} ${styles[style]}`}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={error}>
            <MDateField
              clearable={clearable}
              fullWidth
              required={required}
              readOnly={readOnly}
              label={label}
              defaultValue={defaultValue}
              value={value}
              onChange={handleChange}
              format={format}
              shouldDisableDate={shouldDisableDate}
              disabled={disabled}
              disableFuture={disableFuture}
              disablePast={disablePast}
              maxDate={maxDate}
              minDate={minDate}
              className={className}
              size={size}
            />
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </div>
      );
    case 'calendar':
      return (
        <div className={`${styles.dateCalendarWrapper} ${styles[style]}`}>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <MDateCalendar
            defaultValue={defaultValue}
            value={value}
            onChange={handleCalendarChange}
            shouldDisableDate={shouldDisableDate}
            disabled={disabled}
            disableFuture={disableFuture}
            disablePast={disablePast}
            maxDate={maxDate}
            minDate={minDate}
            className={className}
          />
          <FormHelperText>{helperText}</FormHelperText>
        </div>
      );
  }
};

export { DatePicker, DatePickerProps };
