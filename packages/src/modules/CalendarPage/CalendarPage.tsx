import { FC, useState } from 'react';
import { Calendar, Tabs } from '../../components';
import { DateHighlight } from '../../helpers';
import dayjs, { Dayjs } from 'dayjs';
import styles from './calendarPage.module.scss';
import { RegisteredEventsTab } from './RegisteredEvents/RegisteredEventsTab';
import { SavedEventsTab } from './SavedEvents/SavedEventsTab';

const testPrimaryHighlights: DateHighlight[] = [
  {
    date: dayjs().add(1, 'day'),
    count: 1,
  },
  {
    date: dayjs().add(2, 'day'),
    count: 2,
  },
  {
    date: dayjs().add(3, 'day'),
    count: 3,
  },
];

const testSecondaryHighlights: DateHighlight[] = [
  {
    date: dayjs().add(1, 'day'),
    count: 3,
  },
  {
    date: dayjs().add(2, 'day'),
    count: 2,
  },
  {
    date: dayjs().add(3, 'day'),
    count: 1,
  },
];

const CalendarPage: FC = () => {
  document.title = 'Calendar - Waves';
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.calendarPageContainer}>
      <div className={styles.calendarPageHeader}>
        <span className={styles.calendarPageHeading}>Calendar</span>
        <span className={styles.calendarPageText}>View the events you have saved or registered for.</span>
      </div>
      <div className={styles.calendarAndEventsContainer}>
        <div className={styles.eventsContainer}>
          <Tabs
            tabs={[
              { tabTitle: 'Registered', tabContent: <RegisteredEventsTab date={selectedDate} /> },
              { tabTitle: 'Saved', tabContent: <SavedEventsTab date={selectedDate} /> },
            ]}
          />
        </div>
        <div className={styles.calendarContainer}>
          <Calendar
            primaryHighlights={testPrimaryHighlights}
            secondaryHighlights={testSecondaryHighlights}
            onDateChange={handleDateChange}
            className={styles.calendar}
          />
        </div>
      </div>
    </div>
  );
};

export { CalendarPage };
