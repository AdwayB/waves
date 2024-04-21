import { DateCalendarSlotsComponentsProps, DatePickerSlotsComponentsProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Colors } from '../../helpers/colors';

const datePickerPopupStyles = () => {
  return {
    '& .MuiPickersToolbar-root': {
      color: Colors.white,
      borderRadius: 20,
      borderColor: Colors.wavesDarkViolet,
    },
  };
};

const actionBarSx = {
  background: Colors.wavesMedViolet,
  borderRadius: '1rem',
  '& .MuiButton-root': {
    borderRadius: '1rem',
    color: Colors.white,
    '&:hover': { background: Colors.menuBGSecondaryHover },
  },
};

const datePickerSlotProps = (helperText?: string, clearable?: boolean): DatePickerSlotsComponentsProps<Dayjs> => {
  return {
    textField: {
      helperText: helperText,
    },
    field: {
      clearable: clearable,
    },
    toolbar: {
      toolbarFormat: 'DD MMMM YYYY',
      toolbarPlaceholder: '??',
      hidden: false,
      sx: {
        background: Colors.wavesMedViolet,
        borderRadius: '1rem',
        color: Colors.white,
        '& .MuiTypography-root': { color: Colors.white },
        '& .MuiButton-root': { color: Colors.white },
      },
    },
    leftArrowIcon: { sx: { color: Colors.white } },
    rightArrowIcon: { sx: { color: Colors.white } },
    calendarHeader: {
      sx: {
        color: Colors.white,
        background: Colors.wavesMedViolet,
        borderRadius: '1rem',
        '.MuiIconButton-root': { color: Colors.white },
      },
    },
    day: {
      sx: {
        color: Colors.white,
        '&.Mui-disabled': {
          color: `${Colors.disabledTextColor} !important`,
        },
        '&:hover': { background: Colors.menuBGSecondaryHover, borderRadius: '1rem', color: Colors.white },
        '&.Mui-selected': {
          background: `${Colors.menuBGSecondaryHover} !important`,
          borderRadius: '1rem',
          borderColor: Colors.menuBGSecondary,
          color: Colors.white,
        },
        '&.MuiPickersDay-today': {
          background: 'transparent',
          border: `1px solid ${Colors.inputFieldColor}`,
        },
      },
    },
    desktopPaper: {
      sx: { background: Colors.wavesMedViolet, borderRadius: '1rem', color: Colors.white },
    },
    mobilePaper: {
      sx: { background: Colors.wavesMedViolet, borderRadius: '1rem', color: Colors.white },
    },
    layout: {
      sx: {
        background: Colors.wavesMedViolet,
        borderRadius: '1rem',
        '& .MuiTypography-root': { color: Colors.white },
      },
    },
  };
};

const dateCalendarSlotProps = (): DateCalendarSlotsComponentsProps<Dayjs> => {
  return {
    calendarHeader: {
      sx: { color: Colors.white, background: Colors.wavesMedViolet, borderRadius: '1rem' },
    },
    leftArrowIcon: { sx: { color: Colors.white } },
    rightArrowIcon: { sx: { color: Colors.white } },
    day: {
      sx: {
        color: Colors.white,
        '&:hover': { background: Colors.wavesMedViolet, borderRadius: '1rem', color: Colors.white },
        '&.Mui-selected': {
          background: `${Colors.wavesMedViolet} !important`,
          borderRadius: '1rem',
          borderColor: Colors.menuBGSecondary,
          color: Colors.white,
        },
      },
    },
  };
};

export { datePickerPopupStyles, actionBarSx, datePickerSlotProps, dateCalendarSlotProps };
