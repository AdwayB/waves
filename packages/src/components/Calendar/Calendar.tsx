import { FC, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styles from './calendar.module.scss';
import { CalendarEvent } from '../../helpers';
import { getCalendarDays } from './helpers';
import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { CalendarDay } from './CalendarDay/CalendarDay';

interface CalendarProps {
  rootDate?: Dayjs | null;
  registeredEvents?: CalendarEvent[];
  savedEvents?: CalendarEvent[];
}

const Calendar: FC<CalendarProps> = (props) => {
  const { rootDate, registeredEvents, savedEvents } = props;
  const [currentDate, setCurrentDate] = useState<Dayjs>(rootDate ? dayjs(rootDate) : dayjs());
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = getCalendarDays(currentDate);

  const handleDateChange = (date: Dayjs) => {
    setCurrentDate(date);
  };

  const handleEventClick = (eventId: string) => {
    console.log('====================================');
    console.log(`Clicked event: ${eventId}`);
    console.log('====================================');
  };

  return (
    <div className={styles.calendarWrapper}>
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
            {calendarDays.map((day, index) => (
              <div className={styles.calendarDay} key={`${day} ${index}`}>
                <CalendarDay
                  currentDate={day ?? dayjs()}
                  onEventClick={handleEventClick}
                  registeredEvents={registeredEvents}
                  savedEvents={savedEvents}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Calendar };
