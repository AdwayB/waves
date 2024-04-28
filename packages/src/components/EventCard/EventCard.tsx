import { FC, useEffect, useRef } from 'react';
import styles from './eventCard.module.scss';
import { Dayjs } from 'dayjs';
import { gsap } from 'gsap';
import { throttle } from '../../helpers';

interface EventCardProps {
  eventId?: string;
  title?: string;
  artist?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
  type?: 'primary' | 'secondary';
  className?: string;
}

const EventCard: FC<EventCardProps> = (props) => {
  const { eventId, title, artist, startDate, endDate, type = 'primary', className } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const handleHover = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = card!.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) / 10;
      const y = -((clientY - (top + height / 2)) / 10);

      gsap.to(card!, {
        scale: 1.1,
        rotationY: x,
        rotationX: y,
        ease: 'inOut',
        transformPerspective: 2000,
        transformOrigin: 'center center',
      });
    };

    const resetNormal = () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        ease: 'power1.easeOut',
        transformPerspective: 2000,
        transformOrigin: 'center center',
      });
    };

    const throttledHandleHover = throttle(handleHover, 20);

    card!.addEventListener('mousemove', throttledHandleHover);
    card!.addEventListener('mouseleave', resetNormal);

    return () => {
      card!.removeEventListener('mousemove', throttledHandleHover);
      card!.removeEventListener('mouseleave', resetNormal);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.eventCardWrapper} ${className}`} key={eventId}>
      <div className={`${styles.eventCard} ${type === 'primary' ? styles.primary : styles.secondary}`}>
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
