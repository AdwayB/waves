import { FC, memo, useCallback, useMemo, useState } from 'react';
import { Calendar, EventCardProps, Tabs } from '../../components';
import { getRegisteredEventsCardData, getSavedEventsCardData } from '../../helpers';
import { Dayjs } from 'dayjs';
import styles from './calendarPage.module.scss';
import { RegisteredEventsTab } from './RegisteredEvents/RegisteredEventsTab';
import { SavedEventsTab } from './SavedEvents/SavedEventsTab';
import { useSelector } from 'react-redux';
import { selectRegisteredEvents, selectSavedEvents } from '../../redux';
import { useGetEventCreators, useGetHighlights } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const MemoizedCalendarPage: FC = () => {
  document.title = 'Calendar - Waves';

  const registeredEventData = useSelector(selectRegisteredEvents);
  const savedEventData = useSelector(selectSavedEvents);

  const memoizedAggregatedEvents = useMemo(
    () => [...registeredEventData, ...savedEventData],
    [registeredEventData, savedEventData],
  );
  const userData = useGetEventCreators(memoizedAggregatedEvents);

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [registeredEventCards, setRegisteredEventCards] = useState<EventCardProps[]>([]);
  const [savedEventCards, setSavedEventCards] = useState<EventCardProps[]>([]);

  const registeredEventHighlights = useGetHighlights(registeredEventData);
  const savedEventHighlights = useGetHighlights(savedEventData);

  const getRegisteredEventCards = useCallback(
    (date: Dayjs) => {
      return getRegisteredEventsCardData(registeredEventData, userData, date);
    },
    [registeredEventData, userData],
  );

  const getSavedEventCards = useCallback(
    (date: Dayjs) => {
      return getSavedEventsCardData(savedEventData, userData, date);
    },
    [savedEventData, userData],
  );

  const handleDateChange = (date: Dayjs) => {
    const selectedStartDate = date.startOf('day');
    if (!selectedDate || !selectedStartDate.isSame(selectedDate.startOf('day'))) {
      setSelectedDate(selectedStartDate);
      setRegisteredEventCards(getRegisteredEventCards(selectedStartDate));
      setSavedEventCards(getSavedEventCards(selectedStartDate));
    }
  };

  const handleCardClick = (eventId?: string) => {
    eventId && navigate(`/view-event/${eventId}`);
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
              {
                tabTitle: 'Registered',
                tabContent: (
                  <RegisteredEventsTab registeredEvents={registeredEventCards} handleCardClick={handleCardClick} />
                ),
              },
              {
                tabTitle: 'Saved',
                tabContent: <SavedEventsTab savedEvents={savedEventCards} handleCardClick={handleCardClick} />,
              },
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
