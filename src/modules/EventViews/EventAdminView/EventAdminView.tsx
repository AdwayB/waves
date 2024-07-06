import { FC, useEffect, useState } from 'react';
import styles from './eventAdminView.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Loading, Rating } from '../../../components';
import { EventBody } from '../EventBody';
import EditIcon from '@mui/icons-material/Edit';
import { useGetEventView } from '../../../hooks';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux';

const EventAdminView: FC = () => {
  document.title = 'View Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventError, setEventError] = useState<boolean>(false);
  const [feedbackError, setFeedbackError] = useState<boolean>(false);

  const { eventData, userData, feedbackData, averageRating, isLoading, isError, isFeedbackLoading, isFeedbackError } =
    useGetEventView(eventId ?? '', true);

  useEffect(() => {
    setEventError(isError);
    setFeedbackError(!!isFeedbackError && isFeedbackError);
  }, [isError, isFeedbackError]);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (eventData?.eventCreatedBy !== currentUser?.UserId) {
      navigate(`/view-event/${eventId}`);
    }
  }, [eventData, currentUser, eventId, navigate]);

  if (!eventId) {
    return <div className={styles.eventFriendlyScreen}>Request a valid event!</div>;
  }

  if (!eventData) {
    return <div className={styles.eventFriendlyScreen}>Event not found!</div>;
  }

  const handleEditEvent = () => {
    navigate(`/user/edit-event/${eventId}`);
  };

  return (
    <div className={styles.eventContainer}>
      <Alert visible={eventError} severity="error" onClose={() => setEventError(false)}>
        An error occurred when fetching event data, please try again later.
      </Alert>
      <Alert visible={feedbackError} severity="error" onClose={() => setFeedbackError(false)}>
        An error occurred when fetching feedback data, please try again later.
      </Alert>
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
        {isLoading ? (
          <div className={styles.eventLoading}>
            <Loading type="progress" />
          </div>
        ) : (
          <EventBody eventInfo={eventData} rating={averageRating ?? '0'} userInfo={userData!} />
        )}
        {isFeedbackLoading ? (
          <div className={styles.feedbackLoading}>
            <Loading type="progress" />
          </div>
        ) : !!feedbackData && feedbackData.length > 0 ? (
          <div className={styles.eventFeedbackContainer}>
            <div className={styles.viewFeedbackContainer}>
              <div className={styles.viewFeedbackHeading}>View Feedback</div>
              <div className={styles.viewFeedbackBody}>
                {feedbackData?.map((feedback, index) => (
                  <div key={index} className={styles.viewFeedbackUnit}>
                    <Rating value={feedback.rating} precision={0.1} />
                    <div className={styles.viewFeedbackComment}>{feedback.comment}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export { EventAdminView };
