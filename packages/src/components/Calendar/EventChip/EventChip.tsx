import { useState, useRef, FC } from 'react';
import { gsap } from 'gsap';
import styles from './eventChip.module.scss';
import { EventCard } from '../EventCard/EventCard';
import { CalendarEvent } from '../../../helpers';

interface EventChipProps {
  event: CalendarEvent;
  isRegistered: boolean;
  onEventClick?: (eventId: string) => void;
}

const EventChip: FC<EventChipProps> = (props) => {
  const { event, isRegistered, onEventClick } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const chipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    gsap.to(chipRef.current, {
      scale: 1.2,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    gsap.to(chipRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  const handleClick = () => {
    if (onEventClick) onEventClick(event.EventId);
    console.log('====================================');
    console.log(`Clicked event: ${event.EventId}`);
    console.log('====================================');
  };

  const getChipClassName = () => {
    if (isRegistered) {
      return `${styles.chip} ${styles.registered}`;
    }
    return `${styles.chip} ${styles.saved}`;
  };

  return (
    <div
      ref={chipRef}
      className={getChipClassName()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {isExpanded ? <EventCard event={event} onEventClick={onEventClick} /> : <span>{event.EventName}</span>}
    </div>
  );
};

export { EventChip };
export type { EventChipProps };
