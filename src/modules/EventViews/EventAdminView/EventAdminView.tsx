import { FC, useEffect, useState } from 'react';
import styles from './eventAdminView.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Event, EventTestData, UserFeedbackTestData } from '../../../helpers';
import { Button, Rating } from '../../../components';
import { EventBody } from '../EventBody';
import EditIcon from '@mui/icons-material/Edit';

const EventAdminView: FC = () => {
  document.title = 'View Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventInfo, setEventInfo] = useState<Event>();
  const eventData = EventTestData;
  const userFeedback = UserFeedbackTestData;

  useEffect(() => {
    const foundEvent = eventData.find((event) => event.EventId === eventId);
    foundEvent && setEventInfo(foundEvent);
  }, [eventData, eventId]);

  if (!eventInfo) {
    return <div className={styles.eventFriendlyScreen}>Event not found!</div>;
  }

  const handleEditEvent = () => {
    console.log('Edit event ' + eventInfo.EventId);
  };

  return (
    <div className={styles.eventContainer}>
      <div className={styles.eventInfoHeader}>
        <div className={styles.eventInfoHeaderLeft}>
          <Button label="Back" onClick={() => navigate(-1)} className={styles.backButton} />
        </div>
        <div className={styles.eventInfoHeaderRight}>
          <span className={styles.eventTitle}>View Event</span>
          <div className={styles.eventActions}>
            <Button
              label={
                <>
                  <EditIcon sx={{ marginRight: '0.5rem', fontSize: '1.3rem' }} />
                  Edit
                </>
              }
              buttontype="secondary"
              onClick={handleEditEvent}
              className={styles.saveButton}
            />
          </div>
        </div>
      </div>
      <div className={styles.eventBody}>
        <EventBody eventInfo={eventInfo} />
        <div className={styles.eventFeedbackContainer}>
          <div className={styles.viewFeedbackContainer}>
            <div className={styles.viewFeedbackHeading}>View Feedback</div>
            <div className={styles.viewFeedbackBody}>
              {userFeedback.map((feedback, index) => (
                <div key={index} className={styles.viewFeedbackUnit}>
                  <Rating value={feedback.Rating} precision={0.1} />
                  <div className={styles.viewFeedbackComment}>{feedback.Comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventAdminView };
