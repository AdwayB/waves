import { FC, useEffect, useState } from 'react';
import { Calendar, EventCardProps, Tabs } from '../../components';
import {
  DateHighlight,
  Event,
  EventTestData,
  UserTestData,
  getRegisteredEventsCardData,
  getSavedEventsCardData,
} from '../../helpers';
import dayjs, { Dayjs } from 'dayjs';
import styles from './calendarPage.module.scss';
import { RegisteredEventsTab } from './RegisteredEvents/RegisteredEventsTab';
import { SavedEventsTab } from './SavedEvents/SavedEventsTab';

const CalendarPage: FC = () => {
  document.title = 'Calendar - Waves';
  const registeredEventData = EventTestData.slice(0, 10);
  const savedEventData = EventTestData.slice(10);
  const userData = UserTestData;
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [registeredEventCards, setRegisteredEventCards] = useState<EventCardProps[]>([]);
  const [savedEventCards, setSavedEventCards] = useState<EventCardProps[]>([]);
  const [registeredEventHighlights, setRegisteredEventHighlights] = useState<DateHighlight[]>([]);
  const [savedEventHighlights, setSavedEventHighlights] = useState<DateHighlight[]>([]);

  useEffect(() => {
    const usingDate = selectedDate ?? dayjs();
    const registeredEvents = getRegisteredEventsCardData(registeredEventData, userData, usingDate);
    const savedEvents = getSavedEventsCardData(savedEventData, userData, usingDate);
    setRegisteredEventCards(registeredEvents);
    setSavedEventCards(savedEvents);
  }, [registeredEventData, savedEventData, selectedDate, userData]);

  useEffect(() => {
    setRegisteredEventHighlights(getHighlights(registeredEventData));
    setSavedEventHighlights(getHighlights(savedEventData));
  }, [registeredEventData, savedEventData]);

  const getHighlights = (events: Event[]): DateHighlight[] => {
    const highlights: DateHighlight[] = [];
    events.forEach((event) => {
      if (event.EventStartDate) {
        const eventDate = dayjs(event.EventStartDate);
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

export { CalendarPage };
