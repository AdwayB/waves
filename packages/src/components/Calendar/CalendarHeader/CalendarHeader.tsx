import { FC } from 'react';
import { Dayjs } from 'dayjs';
import styles from './calendarHeader.module.scss';

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
      <div className={styles.changeIcon} onClick={onPrevYear}>
        <i className="fas fa-angle-double-left"></i>
      </div>
      <div className={styles.changeIcon} onClick={onPrevMonth}>
        <i className="fas fa-angle-left"></i>
      </div>
      <span className={styles.currentDate}>{currentDate.format('MMMM YYYY')}</span>
      <div className={styles.changeIcon} onClick={onNextMonth}>
        <i className="fas fa-angle-right"></i>
      </div>
      <div className={styles.changeIcon} onClick={onNextYear}>
        <i className="fas fa-angle-double-right"></i>
      </div>
    </div>
  );
};

export { CalendarHeader };
export type { CalendarHeaderProps };
