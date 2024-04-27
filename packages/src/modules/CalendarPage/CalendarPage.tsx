import { FC } from 'react';
import { Calendar, Tabs } from '../../components';
import { DateHighlight } from '../../helpers';
import dayjs from 'dayjs';
import styles from './calendarPage.module.scss';

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
              { tabTitle: 'Upcoming', tabContent: 'upcoming' },
              { tabTitle: 'Past', tabContent: 'past' },
            ]}
          />
        </div>
        <div className={styles.calendarContainer}>
          <Calendar
            primaryHighlights={testPrimaryHighlights}
            secondaryHighlights={testSecondaryHighlights}
            className={styles.calendar}
          />
        </div>
      </div>
    </div>
  );
};

export { CalendarPage };
