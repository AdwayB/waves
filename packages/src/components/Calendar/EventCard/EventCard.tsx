import { FC, useRef } from 'react';
import { gsap } from 'gsap';
import { CalendarEvent } from '../../../helpers';
import styles from './eventCard.module.scss';
import dayjs from 'dayjs';

interface EventCardProps {
  event: CalendarEvent;
  onEventClick?: (eventId: string) => void;
}

const EventCard: FC<EventCardProps> = (props) => {
  const { event, onEventClick } = props;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (onEventClick) onEventClick(event.EventId);
    console.log('====================================');
    console.log(`Clicked event: ${event.EventId}`);
    console.log('====================================');
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      rotationY: 180,
      duration: 0.5,
      ease: 'power2.inOut',
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      transformPerspective: 800,
    });
  };

  return (
    <div
      ref={cardRef}
      className={styles.eventCard}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.eventCardFront}>
        <span className={styles.eventCardTitle}>{event.EventName}</span>
        <span className={styles.eventCardArtist}>{event.EventCreatedBy}</span>
      </div>
      <div className={styles.eventCardBack}>
        <span className={styles.eventCardTitle}>{event.EventName}</span>
        <span className={styles.eventCardDescription}>{event.EventDescription}</span>
        <span className={styles.eventCardTiming}>
          <span className={styles.eventStart}>
            Start:
            <span className={styles.eventStartTime}>
              {dayjs(event.EventStartDate).format('DD MMM YYYY [at] hh:mm A')}
            </span>
          </span>
          <span className={styles.eventEnd}>
            End:
            <span className={styles.eventEndTime}>{dayjs(event.EventEndDate).format('DD MMM YYYY [at] hh:mm A')}</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default EventCard;

export { EventCard };
export type { EventCardProps };
