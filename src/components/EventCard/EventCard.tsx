import { FC, useEffect, useRef } from 'react';
import styles from './eventCard.module.scss';
import { Dayjs } from 'dayjs';
import { gsap } from 'gsap';

interface EventCardProps {
  eventId?: string;
  title?: string;
  artist?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
  type?: 'primary' | 'secondary';
  onClickHandler?: (eventId?: string) => void;
  className?: string;
}

/**
 * A styled card for the Calendar page.
 * Can be used as a primary or secondary card.
 *
 * @param {EventCardProps} props - The props for configuring the EventCard.
 */
const EventCard: FC<EventCardProps> = (props) => {
  const { eventId, title, artist, startDate, endDate, type = 'primary', onClickHandler, className } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const perspective = 2000;

    const handleHover = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) / 10;
      const y = -((clientY - (top + height / 2)) / 10);

      gsap.to(card, {
        scale: 1,
        rotationY: x,
        rotationX: y,
        duration: 0,
        transformPerspective: perspective,
        transformOrigin: 'center center',
      });
    };

    const resetNormal = () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.2,
        transformPerspective: perspective,
        transformOrigin: 'center center',
      });
    };

    card!.addEventListener('mousemove', handleHover);
    card!.addEventListener('mouseleave', resetNormal);

    return () => {
      card!.removeEventListener('mousemove', handleHover);
      card!.removeEventListener('mouseleave', resetNormal);
    };
  }, []);

  const handleCardClick = () => {
    if (onClickHandler) {
      onClickHandler(eventId);
    }
  };

  return (
    <div ref={ref} className={`${styles.eventCardWrapper} ${className}`} key={eventId}>
      <div
        className={`${styles.eventCard} ${type === 'primary' ? styles.primary : styles.secondary}`}
        onClick={handleCardClick}
      >
        <div className={styles.eventCardTitle}>
          <span className={styles.eventCardTitleText}>{title}</span>
          <span className={styles.eventCardArtistText}>{artist}</span>
        </div>
        <div className={styles.eventCardDates}>
          <span className={styles.dateLabel}>
            Start:&nbsp;
            <span className={styles.eventDate}>{startDate?.format('DD MMMM YYYY')}</span>
          </span>
          <span className={styles.dateLabel}>
            End:&nbsp;
            <span className={styles.eventDate}>{endDate?.format('DD MMMM YYYY')}</span>
          </span>
        </div>
        <div className={styles.eventCardTimes}>
          <span className={styles.eventTime}>{startDate?.format('hh:mm A')}</span>
          <div className={styles.graphic}>
            <span className={styles.circle} />
            <span className={styles.line} />
            <span className={styles.circle} />
          </div>
          <span className={styles.eventTime}>{endDate?.format('hh:mm A')}</span>
        </div>
      </div>
    </div>
  );
};

export { EventCard };
export type { EventCardProps };
