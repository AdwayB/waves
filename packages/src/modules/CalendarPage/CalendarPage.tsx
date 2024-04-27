import { FC } from 'react';
import { Calendar } from '../../components';
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
    <>
      <div style={{ fontSize: '50px', color: 'red' }}>Testing Calendar</div>
      <div className={styles.calendarContainer}>
        <Calendar primaryHighlights={testPrimaryHighlights} secondaryHighlights={testSecondaryHighlights} />
      </div>
    </>
  );
};

export { CalendarPage };
