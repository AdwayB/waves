import { FC } from 'react';
import { Dayjs } from 'dayjs';
import styles from './calendarHeader.module.scss';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Tooltip } from '../../Tooltip';

interface CalendarHeaderProps {
  currentDate: Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
}

const CalendarHeader: FC<CalendarHeaderProps> = (props) => {
  const { currentDate, onPrevMonth, onNextMonth, onPrevYear, onNextYear } = props;

  return (
    <div className={styles.calendarHeader}>
      <Tooltip text="View Previous Year">
        <div className={styles.changeIcon} onClick={onPrevYear}>
          <SkipPreviousIcon color="inherit" className={styles.skipIcon} />
        </div>
      </Tooltip>
      <Tooltip text="View Previous Month">
        <div className={styles.changeIcon} onClick={onPrevMonth}>
          <ArrowLeftIcon color="inherit" className={styles.icon} />
        </div>
      </Tooltip>
      <span className={styles.currentDate}>{currentDate.format('MMMM YYYY')}</span>
      <Tooltip text="View Next Month">
        <div className={styles.changeIcon} onClick={onNextMonth}>
          <ArrowRightIcon color="inherit" className={styles.icon} />
        </div>
      </Tooltip>
      <Tooltip text="View Next Year">
        <div className={styles.changeIcon} onClick={onNextYear}>
          <SkipNextIcon color="inherit" className={styles.skipIcon} />
        </div>
      </Tooltip>
    </div>
  );
};

export { CalendarHeader };
export type { CalendarHeaderProps };
