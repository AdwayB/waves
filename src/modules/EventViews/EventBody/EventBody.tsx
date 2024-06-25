import { FC } from 'react';
import { Event } from '../../../helpers';
import { Chip, Rating } from '../../../components';
import styles from './eventBody.module.scss';
import dayjs from 'dayjs';

interface EventBodyProps {
  eventInfo: Event;
}

const EventBody: FC<EventBodyProps> = (props) => {
  const { eventInfo } = props;
  return (
    <div className={styles.eventInfoContainer}>
      <div className={styles.eventInfoBlockGroup}>
        <div className={styles.eventInfoLeftBlock}>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Event Name:</span>
            <span className={styles.eventInfoValue}>{eventInfo.EventName}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Created By:</span>
            <span className={styles.eventInfoValue}>{eventInfo.EventCreatedBy}</span>
          </div>
        </div>
        <div className={styles.eventInfoRightBlock}>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Rating:</span>
            <Rating value={Math.floor(Math.random() * 5) + 1} precision={0.1} className={styles.eventRating} />
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Event Genres:</span>
            {eventInfo.EventGenres.map((genre) => (
              <Chip key={genre} label={genre} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.eventDescriptionUnit}>
        <span className={styles.eventInfoLabel}>Description:</span>
        <div className={`${styles.eventInfoValue} ${styles.eventDescription}`}>{eventInfo.EventDescription}</div>
      </div>
      <div className={styles.eventInfoBlockGroup}>
        <div className={styles.eventInfoLeftBlock}>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Start Date:</span>
            <span className={styles.eventInfoValue}>{dayjs(eventInfo.EventStartDate).format('DD MMM YYYY')}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>End Date:</span>
            <span className={styles.eventInfoValue}>{dayjs(eventInfo.EventEndDate).format('DD MMM YYYY')}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Total Seats:</span>
            <span className={styles.eventInfoValue}>{eventInfo.EventTotalSeats}</span>
          </div>
        </div>
        <div className={styles.eventInfoRightBlock}>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Start Time:</span>
            <span className={styles.eventInfoValue}>{dayjs(eventInfo.EventStartDate).format('hh:mm A')}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>End Time:</span>
            <span className={styles.eventInfoValue}>{dayjs(eventInfo.EventEndDate).format('hh:mm A')}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Available Seats:</span>
            <span className={styles.eventInfoValue}>{eventInfo.EventTotalSeats - eventInfo.EventRegisteredSeats}</span>
          </div>
        </div>
      </div>
      <div className={`${styles.eventInfoUnit} ${styles.eventStatusUnit}`}>
        <span className={styles.eventInfoLabel}>Event Status:</span>
        <span className={styles.eventInfoValue}>
          <Chip label={eventInfo.EventStatus} />
        </span>
      </div>
    </div>
  );
};

export { EventBody };
export type { EventBodyProps };
