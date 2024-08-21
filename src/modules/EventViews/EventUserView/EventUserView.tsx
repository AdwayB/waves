import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './eventUserView.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, InputField, Loading, Rating } from '../../../components';
import { EventBody } from '../EventBody';
import { useGetEventView } from '../../../hooks';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectRegisteredEvents, selectSavedEvents } from '../../../redux';
import {
  AddFeedbackRequest,
  RegistrationRequest,
  UpdateFeedbackRequest,
  UserDetailsWithEventIdList,
} from '../../../helpers';
import { addFeedback, registerForEvent, saveEvent, updateFeedback } from '../../../utils';
import DoneIcon from '@mui/icons-material/Done';

const CheckIcon = () => (
  <div className={styles.checkIcon}>
    <DoneIcon />
  </div>
);

const EventUserView: FC = () => {
  document.title = 'View Event - Waves';
  const navigate = useNavigate();

  /* INIT PARAMS */
  const { eventId } = useParams<{ eventId: string }>();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [eventError, setEventError] = useState<boolean>(false);
  const [feedbackError, setFeedbackError] = useState<boolean>(false);

  /* Registration UI States */
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [isRegisterError, setIsRegisterError] = useState<boolean>(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  /* Save Event UI States */
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isSaveError, setIsSaveError] = useState<boolean>(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  /* Submit Feedback UI States */
  const [isSubmitFeedbackLoading, setIsSubmitFeedbackLoading] = useState<boolean>(false);
  const [isSubmitFeedbackError, setIsSubmitFeedbackError] = useState<boolean>(false);
  const [isSubmitFeedbackSuccess, setIsSubmitFeedbackSuccess] = useState<boolean>(false);

  const currentUser = useSelector(selectCurrentUser);
  const savedEvents = useSelector(selectSavedEvents);
  const registeredEvents = useSelector(selectRegisteredEvents);

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
  } = useGetEventView(eventId ?? '', false, false, currentUser?.userId);

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

  useEffect(() => {
    if (eventData?.eventCreatedBy === currentUser?.userId) {
      navigate(`/user/view-event/admin/${eventId}`);
    }
  }, [eventData, currentUser, eventId, navigate]);

  useEffect(() => {
    if (savedEvents.filter((event) => event.eventId === eventData?.eventId).length > 0) {
      setIsSaved(true);
      setIsRegistered(false);
    } else if (registeredEvents.filter((event) => event.eventId === eventData?.eventId).length > 0) {
      setIsRegistered(true);
      setIsSaved(false);
    } else {
      setIsSaved(false);
      setIsRegistered(false);
    }
  }, [eventData, registeredEvents, savedEvents]);

  if (!eventId) {
    return <div className={styles.eventFriendlyScreen}>Request a valid event!</div>;
  }

  if (!eventData) {
    return <div className={styles.eventFriendlyScreen}>Event not found!</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRegisterEvent = async () => {
    if (isRegistered) {
      return;
    }
    setIsRegisterLoading(true);
    const registrationRequest: RegistrationRequest = {
      UserId: currentUser?.userId ?? '',
      EventId: eventData.eventId ?? '',
      UserEmail: currentUser?.email ?? '',
    };
    const response = await registerForEvent(registrationRequest);
    if (response.status !== 200) {
      setIsRegisterError(true);
    }
    setIsRegisterLoading(false);
    setIsRegisterSuccess(true);
  };

  const handleSaveEvent = async () => {
    if (isSaved) {
      return;
    }
    setIsSaveLoading(true);
    const saveRequest: UserDetailsWithEventIdList = {
      ...currentUser!,
      eventID: [eventData.eventId ?? ''],
    };
    const response = await saveEvent(saveRequest);
    if (response.status !== 200) {
      setIsSaveError(true);
    }
    setIsSaveLoading(false);
    setIsSaveSuccess(true);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    setIsSubmitFeedbackLoading(true);

    if (!!feedbackByUserData && feedbackByUserData.feedbackId) {
      const updateFeedbackRequest: UpdateFeedbackRequest = {
        eventId: eventId ?? '',
        userId: currentUser?.userId ?? '',
        feedbackId: feedbackByUserData.feedbackId,
        rating: rating,
        comment: comment,
      };

      const response = await updateFeedback(updateFeedbackRequest);

      if (response.status !== 200) {
        setIsSubmitFeedbackError(true);
      } else {
        setIsSubmitFeedbackLoading(false);
        setIsSubmitFeedbackSuccess(true);
      }
    } else {
      const addFeedbackRequest: AddFeedbackRequest = {
        eventId: eventId ?? '',
        userId: currentUser?.userId ?? '',
        rating: rating,
        comment: comment,
      };
      const response = await addFeedback(addFeedbackRequest);

      if (response.status !== 200) {
        setIsSubmitFeedbackError(true);
      } else {
        setIsSubmitFeedbackLoading(false);
        setIsSubmitFeedbackSuccess(true);
      }
    }
  };

  return (
    <>
      <Alert visible={eventError} severity="error" onClose={() => setEventError(false)}>
        An error occurred when fetching event data, please try again later.
      </Alert>
      <Alert visible={feedbackError} severity="error" onClose={() => setFeedbackError(false)}>
        An error occurred when fetching feedback data, please try again later.
      </Alert>
      <Alert
        visible={isRegisterSuccess}
        severity="success"
        onClose={() => {
          setIsRegisterSuccess(false);
          navigate('/user/');
        }}
      >
        Successfully registered for {eventData.eventName}!
      </Alert>
      <Alert
        visible={isRegisterError}
        severity="error"
        onClose={() => {
          setIsRegisterError(false);
          navigate('/user/');
        }}
      >
        An error occurred when registering for the event, please try again later.
      </Alert>
      <Alert
        visible={isSaveSuccess}
        severity="success"
        onClose={() => {
          setIsSaveSuccess(false);
          navigate('/user/');
        }}
      >
        Successfully saved {eventData.eventName}!
      </Alert>
      <Alert
        visible={isSaveError}
        severity="error"
        onClose={() => {
          setIsSaveError(false);
          navigate('/user/');
        }}
      >
        An error occurred when saving the event, please try again later.
      </Alert>
      <Alert
        visible={isSubmitFeedbackSuccess}
        severity="success"
        onClose={() => {
          setIsSubmitFeedbackSuccess(false);
          navigate('/user/');
        }}
      >
        {feedbackByUserData?.feedbackId
          ? 'Successfully updated your feedback!'
          : 'Successfully submitted your feedback!'}
      </Alert>
      <Alert
        visible={isSubmitFeedbackError}
        severity="error"
        onClose={() => {
          setIsSubmitFeedbackError(false);
        }}
      >
        {feedbackByUserData?.feedbackId
          ? 'An error occurred when updating your feedback, please try again later.'
          : 'An error occurred when submitting your feedback, please try again later.'}
      </Alert>
      <div className={styles.eventContainer}>
        <div className={styles.eventInfoHeader}>
          <div className={styles.eventInfoHeaderLeft}>
            <Button label="Back" onClick={handleBackClick} className={styles.backButton} />
          </div>
          <div className={styles.eventInfoHeaderRight}>
            <span className={styles.eventTitle}>View Event</span>
            <div className={styles.eventActions}>
              <Button
                label={isRegistered ? CheckIcon() : 'Register'}
                onClick={handleRegisterEvent}
                buttonloading={isRegisterLoading}
                className={styles.registerButton}
              />
              <Button
                label={isSaved ? CheckIcon() : 'Save'}
                buttontype="secondary"
                onClick={handleSaveEvent}
                buttonloading={isSaveLoading}
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
                      precision={1}
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
                  <Button
                    label={feedbackByUserData?.feedbackId ? 'Update Feedback' : 'Submit Feedback'}
                    buttonloading={isSubmitFeedbackLoading}
                    onClick={handleCommentSubmit}
                  />
                </div>
              </div>
              {!!feedbackData && feedbackData.length > 0 && (
                <div className={styles.viewFeedbackContainer}>
                  <div className={styles.viewFeedbackHeading}>View Feedback</div>
                  <div className={styles.viewFeedbackBody}>
                    {feedbackData.map((feedback, index) => (
                      <div key={index} className={styles.viewFeedbackUnit}>
                        <Rating value={feedback.rating} precision={1} />
                        <div className={styles.viewFeedbackComment}>{feedback.comment}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { EventUserView };
