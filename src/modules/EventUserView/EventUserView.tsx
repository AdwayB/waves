import { FC, useEffect, useState } from 'react';
import styles from './eventUserView.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Event, EventTestData } from '../../helpers';
import { Button, Chip, Rating } from '../../components';
import dayjs from 'dayjs';

const EventUserView: FC = () => {
  document.title = 'View Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventInfo, setEventInfo] = useState<Event>();
  const eventData = EventTestData;

  useEffect(() => {
    const foundEvent = eventData.find((event) => event.EventId === eventId);
    foundEvent && setEventInfo(foundEvent);
  }, [eventData, eventId]);

  if (!eventInfo) {
    return <div>Event not found</div>;
  }

  return (
    <div className={styles.eventContainer}>
      <div className={styles.eventInfoHeader}>
        <div className={styles.eventInfoHeaderLeft}>
          <Button label="Back" onClick={() => navigate(-1)} className={styles.backButton} />
        </div>
        <div className={styles.eventInfoHeaderRight}>
          <span className={styles.eventTitle}>View Event</span>
        </div>
      </div>
      <div className={styles.eventBody}>
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
                  <Chip label={genre} />
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
                <span className={styles.eventInfoValue}>
                  {eventInfo.EventTotalSeats - eventInfo.EventRegisteredSeats}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.eventInfoUnit}>
            <span className={styles.eventInfoLabel}>Event Status:</span>
            <span className={styles.eventInfoValue}>
              <Chip label={eventInfo.EventStatus} />
            </span>
          </div>
        </div>
        <div className={styles.eventFeedbackContainer}>
          <div className={styles.eventFeedbackHeading}>Comments</div>
        </div>
      </div>
    </div>
  );
};

export { EventUserView };
