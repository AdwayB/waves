import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './eventUserView.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Event, EventTestData, UserFeedbackTestData } from '../../helpers';
import { Button, Chip, InputField, Rating } from '../../components';
import dayjs from 'dayjs';

const EventUserView: FC = () => {
  document.title = 'View Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventInfo, setEventInfo] = useState<Event>();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const eventData = EventTestData;
  const userFeedback = UserFeedbackTestData;

  useEffect(() => {
    const foundEvent = eventData.find((event) => event.EventId === eventId);
    foundEvent && setEventInfo(foundEvent);
  }, [eventData, eventId]);

  if (!eventInfo) {
    return <div className={styles.eventFriendlyScreen}>Event not found!</div>;
  }

  const handleRegisterEvent = () => {
    console.log('Register event ' + eventInfo.EventId);
  };

  const handleSaveEvent = () => {
    console.log('Save event ' + eventInfo.EventId);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('Comment submitted: ', comment);
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
            <Button label="Register" onClick={handleRegisterEvent} className={styles.registerButton} />
            <Button label="Save" buttontype="secondary" onClick={handleSaveEvent} className={styles.saveButton} />
          </div>
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
          <div className={`${styles.eventInfoUnit} ${styles.eventStatusUnit}`}>
            <span className={styles.eventInfoLabel}>Event Status:</span>
            <span className={styles.eventInfoValue}>
              <Chip label={eventInfo.EventStatus} />
            </span>
          </div>
        </div>
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

export { EventUserView };
