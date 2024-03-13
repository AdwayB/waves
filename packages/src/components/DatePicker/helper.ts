import { DatePickerSlotsComponentsProps } from '@mui/x-date-pickers';
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
  background: Colors.menuBGSecondary,
  borderRadius: '1rem',
  '& .MuiButton-root': { color: Colors.white },
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
        background: Colors.menuBGSecondary,
        borderRadius: '1rem',
        color: Colors.white,
        '& .MuiTypography-root': { color: Colors.white },
        '& .MuiButton-root': { color: Colors.white },
      },
    },
    leftArrowIcon: { sx: { color: Colors.white } },
    rightArrowIcon: { sx: { color: Colors.white } },
    calendarHeader: {
      sx: { color: Colors.white, background: Colors.menuBGSecondary, borderRadius: '1rem' },
    },
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
    desktopPaper: {
      sx: { background: Colors.menuBGSecondary, borderRadius: '1rem', color: Colors.white },
    },
    mobilePaper: {
      sx: { background: Colors.menuBGSecondary, borderRadius: '1rem', color: Colors.white },
    },
    layout: {
      sx: {
        background: Colors.menuBGSecondary,
        borderRadius: '1rem',
        '& .MuiTypography-root': { color: Colors.white },
      },
    },
  };
};

export { datePickerPopupStyles, actionBarSx, datePickerSlotProps };
