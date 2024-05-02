import { FC, memo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styles from './calendar.module.scss';
import { getCalendarDays } from './helpers';
import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { CalendarDay } from './CalendarDay/CalendarDay';
import { Button } from '../Button';
import { DateHighlight } from './types';

interface CalendarProps {
  rootDate?: Dayjs | null;
  primaryHighlights?: DateHighlight[];
  secondaryHighlights?: DateHighlight[];
  primaryHighlightColor?: string;
  secondaryHighlightColor?: string;
  onDateChange?: (date: Dayjs) => void;
  className?: string;
}

/**
 * A Calendar component that displays a monthly view with navigation between months and years.
 * Supports highlighting specific dates in two themes with customizable highlight color.
 * Supports date selection with onDateChange callback.
 * Can have custom root date.
 *
 * @param {onDateChange} onDateChange - The callback function to handle date selection.
 *
 * @param {CalendarProps} props - The properties for configuring the Calendar component.
 */

const Calendar: FC<CalendarProps> = (props) => {
  const {
    rootDate,
    primaryHighlights,
    secondaryHighlights,
    primaryHighlightColor,
    secondaryHighlightColor,
    onDateChange,
    className,
  } = props;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(rootDate ? dayjs(rootDate) : dayjs());
  const [currentDate, setCurrentDate] = useState<Dayjs>(rootDate ? dayjs(rootDate) : dayjs());
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = getCalendarDays(currentDate);

  const handleViewChange = (date: Dayjs) => {
    setCurrentDate(date);
  };

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
    if (onDateChange) onDateChange(date);
  };

  const handleClickToday = () => {
    handleViewChange(dayjs());
    handleDateChange(dayjs());
  };

  return (
    <div className={`${styles.calendarWrapper} ${className}`}>
      <div className={styles.calendar}>
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={() => handleViewChange(currentDate.subtract(1, 'month'))}
          onNextMonth={() => handleViewChange(currentDate.add(1, 'month'))}
          onPrevYear={() => handleViewChange(currentDate.subtract(1, 'year'))}
          onNextYear={() => handleViewChange(currentDate.add(1, 'year'))}
        />
        <div className={styles.calendarBody}>
          <div className={styles.weekDayContainer}>
            {weekDays.map((day) => (
              <div className={styles.weekDay} key={day}>
                {day}
              </div>
            ))}
          </div>
          <div className={styles.calendarDaysContainer}>
            {calendarDays.map((date, index) => (
              <div className={styles.calendarDay} key={`${date} ${index}`}>
                <CalendarDay
                  date={date}
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  primaryHighlights={primaryHighlights}
                  secondaryHighlights={secondaryHighlights}
                  primaryHighlightColor={primaryHighlightColor}
                  secondaryHighlightColor={secondaryHighlightColor}
                  onDateChange={handleDateChange}
                />
              </div>
            ))}
          </div>
          <div className={styles.calendarFooter}>
            <span className={styles.buttonWrapper}>
              <Button label="Today" buttontype="secondary" onClick={handleClickToday} className={styles.todayButton} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

memo(Calendar);
export { Calendar };
export type { CalendarProps };
