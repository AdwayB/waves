import { FC } from 'react';
import styles from './myEvents.module.scss';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux';
import { MyEventsAdminView } from './MyEventsAdminView';
import { MyEventsUserView } from './MyEventsUserView';

const MyEvents: FC = () => {
  document.title = 'My Events - Waves';
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className={styles.myEventsContainer}>
      <div className={styles.myEventsHeader}>
        <div className={styles.myEventsHeading}>
          <span className={styles.myEventsTitle}>My Events</span>
          <span className={styles.myEventsText}>
            {currentUser?.Type === 'Admin' ? 'View your events.' : 'View your registrations.'}
          </span>
        </div>
      </div>
      <div className={styles.myEventsTable}>
        {currentUser?.Type === 'Admin' ? (
          <MyEventsAdminView userId={currentUser?.UserId ?? ''} />
        ) : (
          <MyEventsUserView userId={currentUser?.UserId ?? ''} />
        )}
      </div>
    </div>
  );
};

export { MyEvents };
