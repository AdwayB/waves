import { FC } from 'react';
import { Calendar, EventCard, Tabs } from '../../components';
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

const getEventCards = (upcoming: boolean = true) => {
  return upcoming ? (
    <EventCard
      title="Test Event"
      artist="Test Artist"
      startDate={dayjs()}
      endDate={dayjs().add(1, 'day').add(13, 'hours')}
    />
  ) : (
    <EventCard
      title="Test Event"
      artist="Test Artist"
      startDate={dayjs().subtract(1, 'day')}
      endDate={dayjs().add(1, 'day').add(13, 'hours')}
      type="secondary"
    />
  );
};

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
              { tabTitle: 'Registered', tabContent: getEventCards() },
              { tabTitle: 'Saved', tabContent: getEventCards(false) },
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
