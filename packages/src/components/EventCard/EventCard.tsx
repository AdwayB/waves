import { FC } from 'react';
import styles from './eventCard.module.scss';
import { Dayjs } from 'dayjs';

interface EventCardProps {
  title?: string;
  artist?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
  type?: 'primary' | 'secondary';
  className?: string;
}

const EventCard: FC<EventCardProps> = (props) => {
  const { title, artist, startDate, endDate, type = 'primary', className } = props;

  return (
    <div className={`${styles.eventCardWrapper} ${className}`}>
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
