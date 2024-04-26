import { useState, useRef, FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { gsap } from 'gsap';
import styles from './calendarDay.module.scss';
import { CalendarEvent } from '../../../helpers';
import { EventChip } from '../EventChip/EventChip';
import { EventCard } from '../EventCard/EventCard';

interface CalendarDayProps {
  currentDate: Dayjs;
  registeredEvents?: CalendarEvent[];
  savedEvents?: CalendarEvent[];
  onEventClick?: (eventId: string) => void;
}

const CalendarDay: FC<CalendarDayProps> = (props) => {
  const { currentDate, registeredEvents, savedEvents, onEventClick } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    gsap.to(dateRef.current, {
      scale: 1.2,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    gsap.to(dateRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  const events = [...(registeredEvents ?? []), ...(savedEvents ?? [])];

  const getDateClassName = () => {
    if (isExpanded) {
      if (currentDate.isSame(dayjs(), 'day')) {
        return `${styles.calendarDate} ${styles.expanded} ${styles.currentDay}`;
      }
      return `${styles.calendarDate} ${styles.expanded}`;
    }
    return `${styles.calendarDate}`;
  };

  return (
    <div ref={dateRef} className={getDateClassName()} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.dateHeader}>
        <span className={styles.dateNumber}>{currentDate.date()}</span>
        <div className={styles.dateEventsChipsContainer}>
          {events.map((event) => (
            <EventChip
              key={event.EventId}
              event={event}
              isRegistered={registeredEvents?.some((e) => e.EventId === event.EventId) ?? false}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>
      {isExpanded && (
        <div className={styles.dateEventsCardsContainer}>
          {events.map((event) => (
            <EventCard key={event.EventId} event={event} onEventClick={onEventClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export { CalendarDay };
export type { CalendarDayProps };
