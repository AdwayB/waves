import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './eventUserView.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, InputField, Loading, Rating } from '../../../components';
import { EventBody } from '../EventBody';
import { useGetEventView } from '../../../hooks';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux';

const EventUserView: FC = () => {
  document.title = 'View Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [eventError, setEventError] = useState<boolean>(false);
  const [feedbackError, setFeedbackError] = useState<boolean>(false);

  const {
    eventData,
    userData,
    feedbackData,
    averageRating,
    feedbackByUserData,
    isLoading,
    isError,
    isFeedbackLoading,
    isFeedbackError,
  } = useGetEventView(eventId ?? '');

  useEffect(() => {
    setEventError(isError);
    setFeedbackError(!!isFeedbackError && isFeedbackError);
  }, [isError, isFeedbackError]);

  useEffect(() => {
    if (feedbackByUserData) {
      setRating(feedbackByUserData?.rating?.valueOf() ?? 0);
      setComment(feedbackByUserData?.comment ?? '');
    }
  }, [feedbackByUserData]);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (eventData?.eventCreatedBy === currentUser?.UserId) {
      navigate(`/view-event/admin/${eventId}`);
    }
  }, [eventData, currentUser, eventId, navigate]);

  if (!eventId) {
    return <div className={styles.eventFriendlyScreen}>Request a valid event!</div>;
  }

  if (!eventData) {
    return <div className={styles.eventFriendlyScreen}>Event not found!</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRegisterEvent = () => {
    console.log('Register event ' + eventData.eventId);
  };

  const handleSaveEvent = () => {
    console.log('Save event ' + eventData.eventId);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('Comment submitted: ', comment);
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
          <Button label="Back" onClick={handleBackClick} className={styles.backButton} />
        </div>
        <div className={styles.eventInfoHeaderRight}>
          <span className={styles.eventTitle}>View Event</span>
          <div className={styles.eventActions}>
            <Button label="Register" onClick={handleRegisterEvent} className={styles.registerButton} />
            <Button label="Save" buttontype="secondary" onClick={handleSaveEvent} className={styles.saveButton} />
          </div>
        </div>
      </div>
      <div className={styles.eventBody}>
        {isLoading ? (
          <div className={styles.eventLoading}>
            <Loading type="progress" />
          </div>
        ) : (
          <EventBody eventInfo={eventData} userInfo={userData!} rating={averageRating!} />
        )}
        {isFeedbackLoading ? (
          <div className={styles.feedbackLoading}>
            <Loading type="progress" />
          </div>
        ) : (
          <div className={styles.eventFeedbackContainer}>
            <div className={styles.addFeedbackContainer}>
              <div className={styles.addFeedbackHeading}>Add Feedback</div>
              <div className={styles.addFeedbackBody}>
                <div className={styles.addRating}>
                  <span className={styles.addRatingLabel}>Add Rating:</span>
                  <Rating
                    value={rating}
                    precision={0.1}
                    onChange={(e, v) => setRating(v ?? 0)}
                    readonly={false}
                    className={styles.addRatingInput}
                  />
                </div>
                <div className={styles.addFeedbackInput}>
                  <InputField
                    type="textarea"
                    label="Enter any comments"
                    id="feedback"
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </div>
                <Button label="Submit" onClick={handleCommentSubmit} />
              </div>
            </div>
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
        )}
      </div>
    </div>
  );
};

export { EventUserView };
