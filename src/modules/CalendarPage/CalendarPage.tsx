import { FC, memo, useCallback, useState } from 'react';
import { Calendar, EventCardProps, Tabs } from '../../components';
import {
  DateHighlight,
  Event,
  EventTestData,
  UserDataResponse,
  UserTestData,
  getRegisteredEventsCardData,
  getSavedEventsCardData,
} from '../../helpers';
import dayjs, { Dayjs } from 'dayjs';
import styles from './calendarPage.module.scss';
import { RegisteredEventsTab } from './RegisteredEvents/RegisteredEventsTab';
import { SavedEventsTab } from './SavedEvents/SavedEventsTab';

const MemoizedCalendarPage: FC = () => {
  document.title = 'Calendar - Waves';
  const registeredEventData = EventTestData.slice(0, 10);
  const savedEventData = EventTestData.slice(10);
  const userData = UserTestData;
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [registeredEventCards, setRegisteredEventCards] = useState<EventCardProps[]>([]);
  const [savedEventCards, setSavedEventCards] = useState<EventCardProps[]>([]);

  const getHighlights = (events: Event[]): DateHighlight[] => {
    const highlights: DateHighlight[] = [];
    events.forEach((event) => {
      if (event.eventStartDate) {
        const eventDate = dayjs(event.eventStartDate).startOf('day');
        const existingHighlight = highlights.find((h) => h.date.utc().isSame(eventDate.utc(), 'day'));
        if (existingHighlight) {
          existingHighlight.count += 1;
        } else {
          highlights.push({
            date: eventDate,
            count: 1,
          });
        }
      }
    });

    return highlights;
  };

  const registeredEventHighlights = getHighlights(registeredEventData);
  const savedEventHighlights = getHighlights(savedEventData);

  const getRegisteredEvents = useCallback(
    (date: Dayjs) => {
      return getRegisteredEventsCardData(registeredEventData, userData as unknown as UserDataResponse[], date);
    },
    [registeredEventData, userData],
  );

  const getSavedEvents = useCallback(
    (date: Dayjs) => {
      return getSavedEventsCardData(savedEventData, userData as unknown as UserDataResponse[], date);
    },
    [savedEventData, userData],
  );

  const handleDateChange = (date: Dayjs) => {
    const selectedStartDate = date.startOf('day');
    if (!selectedDate || !selectedStartDate.isSame(selectedDate.startOf('day'))) {
      setSelectedDate(selectedStartDate);
      setRegisteredEventCards(getRegisteredEvents(selectedStartDate));
      setSavedEventCards(getSavedEvents(selectedStartDate));
    }
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
              { tabTitle: 'Registered', tabContent: <RegisteredEventsTab registeredEvents={registeredEventCards} /> },
              { tabTitle: 'Saved', tabContent: <SavedEventsTab savedEvents={savedEventCards} /> },
            ]}
          />
        </div>
        <div className={styles.calendarContainer}>
          <Calendar
            primaryHighlights={registeredEventHighlights}
            secondaryHighlights={savedEventHighlights}
            onDateChange={handleDateChange}
            className={styles.calendar}
          />
        </div>
      </div>
    </div>
  );
};

const CalendarPage = memo(MemoizedCalendarPage);
export { CalendarPage };
