import { FC, useEffect, useState } from 'react';
import styles from './eventAdminView.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, ColumnType, Loading, Rating, RowType, Table } from '../../../components';
import { EventBody } from '../EventBody';
import EditIcon from '@mui/icons-material/Edit';
import { useGetEventView, useGetRegisteredUsers } from '../../../hooks';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux';

const RegisteredUsersTableColumns: ColumnType[] = [
  { id: 0, title: 'Name', name: 'name' },
  { id: 1, title: 'E-Mail ID', name: 'email' },
  { id: 2, title: 'Mobile Number', name: 'mobileNumber' },
  { id: 3, title: 'Country', name: 'country' },
];

interface RegisteredUsersColumnNames {
  name?: string;
  email?: string;
  mobileNumber?: string;
  country?: string;
}

const EventAdminView: FC = () => {
  document.title = 'View Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventError, setEventError] = useState<boolean>(false);
  const [feedbackError, setFeedbackError] = useState<boolean>(false);
  const [registeredUsersError, setRegisteredUsersError] = useState<boolean>(false);

  const { eventData, userData, feedbackData, averageRating, isLoading, isError, isFeedbackLoading, isFeedbackError } =
    useGetEventView(eventId ?? '', true);

  const {
    totalRegistrations,
    users: registeredUsersData,
    isLoading: isRegisteredUsersLoading,
    isError: isRegisteredUsersError,
    setApiPage,
  } = useGetRegisteredUsers(eventId ?? '');

  const RegisteredUserTableRows: RegisteredUsersColumnNames[] =
    registeredUsersData
      ?.filter((user) => user !== null && user !== undefined)
      .map((user) => ({
        name: user.legalName ?? '',
        email: user.email ?? '',
        mobileNumber: user.mobileNumber ?? '',
        country: user.country ?? '',
      })) ?? [];

  useEffect(() => {
    setEventError(isError);
    setFeedbackError(!!isFeedbackError && isFeedbackError);
    setRegisteredUsersError(isRegisteredUsersError);
  }, [isError, isFeedbackError, isRegisteredUsersError]);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (eventData?.eventCreatedBy !== currentUser?.userId) {
      navigate(`/user/view-event/${eventId}`);
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

  const handleGetNextApiPage = () => {
    setApiPage((prev) => prev + 1);
  };

  return (
    <div className={styles.eventContainer}>
      <Alert visible={eventError} severity="error" onClose={() => setEventError(false)}>
        An error occurred when fetching event data, please try again later.
      </Alert>
      <Alert visible={feedbackError} severity="error" onClose={() => setFeedbackError(false)}>
        An error occurred when fetching feedback data, please try again later.
      </Alert>
      <Alert visible={registeredUsersError} severity="error" onClose={() => setRegisteredUsersError(false)}>
        An error occurred when fetching registered users data, please try again later.
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
          <div style={{ width: '56%' }}>
            <EventBody eventInfo={eventData} rating={averageRating ?? '0'} userInfo={userData!} />
          </div>
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
        <div className={styles.registeredUsersSection}>
          <div className={styles.registeredUsersTable}>
            <Table
              headerAlign="center"
              rowAlign="center"
              isLoading={isRegisteredUsersLoading}
              rowsPerPage={6}
              friendlyScreenMessage={
                isRegisteredUsersError
                  ? 'Error loading registered users data, please try again later.'
                  : 'No registrations yet!'
              }
              columns={RegisteredUsersTableColumns}
              rows={RegisteredUserTableRows as RowType}
              showActions={false}
            />
          </div>
          <div className={styles.registeredUsersFooter}>
            <div className={styles.registeredUsersInfoWrapper}>
              <span className={styles.registeredUsersInfo}>
                Total Registrations: <span className={styles.registeredUsersCount}>{totalRegistrations}</span>
              </span>
              <span className={styles.registeredUsersInfo}>
                Visible Registrations:{' '}
                <span className={styles.registeredUsersCount}>{RegisteredUserTableRows.length}</span>
              </span>
            </div>
            <Button label="Load More Users" onClick={handleGetNextApiPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventAdminView };
