import { FC } from 'react';
import styles from './myEvents.module.scss';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux';
import { MyEventsAdminView } from './MyEventsAdminView';
import { MyEventsUserView } from './MyEventsUserView';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../helpers';

const MyEvents: FC = () => {
  document.title = 'My Events - Waves';
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const handleCreateEvent = () => {
    navigate('/user/create-event');
  };

  return (
    <div className={styles.myEventsContainer}>
      <div className={styles.myEventsHeader}>
        <div className={styles.myEventsHeading}>
          <span className={styles.myEventsTitle}>My Events</span>
          <span className={styles.myEventsText}>
            {currentUser?.Type === UserType.Admin ? 'View your events.' : 'View your registrations.'}
          </span>
        </div>
        {currentUser?.Type === UserType.Admin && (
          <div className={styles.createEventButton}>
            <Button
              label="Create Event"
              buttontype="primary"
              onClick={handleCreateEvent}
              className={styles.createButton}
            />
          </div>
        )}
      </div>
      <div className={styles.myEventsTable}>
        {currentUser?.Type === UserType.Admin ? (
          <MyEventsAdminView userId={currentUser?.UserId ?? ''} />
        ) : (
          <MyEventsUserView userId={currentUser?.UserId ?? ''} />
        )}
      </div>
    </div>
  );
};

export { MyEvents };
