import { FC, useState } from 'react';
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
  onDateChange?: (date: Dayjs) => void;
  className?: string;
}

const Calendar: FC<CalendarProps> = (props) => {
  const { rootDate, primaryHighlights, secondaryHighlights, onDateChange, className } = props;
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(rootDate ? dayjs(rootDate) : dayjs());
  const currentDate = rootDate ? dayjs(rootDate) : dayjs();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = getCalendarDays(currentDate);

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
    if (onDateChange) onDateChange(date);
  };

  return (
    <div className={`${styles.calendarWrapper} ${className}`}>
      <div className={styles.calendar}>
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={() => handleDateChange(currentDate.subtract(1, 'month'))}
          onNextMonth={() => handleDateChange(currentDate.add(1, 'month'))}
          onPrevYear={() => handleDateChange(currentDate.subtract(1, 'year'))}
          onNextYear={() => handleDateChange(currentDate.add(1, 'year'))}
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
                  onDateChange={handleDateChange}
                />
              </div>
            ))}
          </div>
          <div className={styles.calendarFooter}>
            <span className={styles.buttonWrapper}>
              <Button
                label="Today"
                buttonType="secondary"
                onClick={() => handleDateChange(dayjs())}
                className={styles.todayButton}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Calendar };
export type { CalendarProps };
