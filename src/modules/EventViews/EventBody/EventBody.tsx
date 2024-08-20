import { FC } from 'react';
import { Event, UserData } from '../../../helpers';
import { Chip, Rating } from '../../../components';
import styles from './eventBody.module.scss';
import dayjs from 'dayjs';

interface EventBodyProps {
  eventInfo: Event;
  userInfo: UserData;
  rating: string;
}

const EventBody: FC<EventBodyProps> = (props) => {
  const { eventInfo, userInfo, rating } = props;
  return (
    <div className={styles.eventInfoContainer}>
      <div className={styles.eventInfoBlockGroup}>
        <div className={styles.eventInfoLeftBlock}>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Event Name:</span>
            <span className={styles.eventInfoValue}>{eventInfo.eventName}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Created By:</span>
            <span className={styles.eventInfoValue}>{userInfo.legalName}</span>
          </div>
        </div>
        <div className={styles.eventInfoRightBlock}>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Rating:</span>
            <Rating value={parseFloat(rating)} precision={0.1} className={styles.eventRating} />
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Event Genres:</span>
            {eventInfo.eventGenres?.map((genre) => <Chip key={genre} label={genre} />)}
          </div>
        </div>
      </div>
      <div className={styles.eventDescriptionUnit}>
        <span className={styles.eventInfoLabel}>Description:</span>
        <div className={`${styles.eventInfoValue} ${styles.eventDescription}`}>{eventInfo.eventDescription}</div>
      </div>
      <div className={styles.eventInfoBlockGroup}>
        <div className={styles.eventInfoLeftBlock}>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Start Date:</span>
            <span className={styles.eventInfoValue}>
              {dayjs(eventInfo.eventStartDate).local().format('DD MMM YYYY')}
            </span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>End Date:</span>
            <span className={styles.eventInfoValue}>{dayjs(eventInfo.eventEndDate).local().format('DD MMM YYYY')}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Total Seats:</span>
            <span className={styles.eventInfoValue}>{eventInfo.eventTotalSeats}</span>
          </div>
        </div>
        <div className={styles.eventInfoRightBlock}>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Start Time:</span>
            <span className={styles.eventInfoValue}>{dayjs(eventInfo.eventStartDate).format('hh:mm A')}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>End Time:</span>
            <span className={styles.eventInfoValue}>{dayjs(eventInfo.eventEndDate).format('hh:mm A')}</span>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Available Seats:</span>
            <span className={styles.eventInfoValue}>
              {(eventInfo.eventTotalSeats ?? 0) - (eventInfo.eventRegisteredSeats ?? 0)}
            </span>
          </div>
        </div>
      </div>
      <div className={`${styles.eventInfoUnit} ${styles.eventStatusUnit}`}>
        <span className={styles.eventInfoLabel}>Event Status:</span>
        <span className={styles.eventInfoValue}>
          <Chip label={eventInfo.eventStatus ?? 'Scheduled'} />
        </span>
      </div>
    </div>
  );
};

export { EventBody };
export type { EventBodyProps };
