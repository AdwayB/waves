import { FC, useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, ColumnType, DeleteModal, RowType, Table } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useGetEventsByUser } from '../../../hooks';
import dayjs from 'dayjs';
import styles from './myEventsAdmin.module.scss';
import { deleteEvent } from '../../../utils';

const MyEventsTableColumns: ColumnType[] = [
  { id: 0, title: 'Name', name: 'name' },
  { id: 1, title: 'Genres', name: 'genres' },
  { id: 2, title: 'Total Seats', name: 'totalSeats' },
  { id: 3, title: 'Registrations', name: 'registrations' },
  { id: 4, title: 'Start Date', name: 'startdate' },
  { id: 5, title: 'End Date', name: 'enddate' },
  { id: 6, title: 'Status', name: 'status' },
];

interface MyEventsColumnNames {
  name?: string;
  genres?: string;
  totalSeats?: number;
  registrations?: number;
  startdate?: string;
  enddate?: string;
  status?: string;
}

interface MyEventsAdminViewProps {
  userId: string;
}

const sendDeleteEvent = async (eventId: string) => {
  const response = await deleteEvent(eventId);
  return response.status;
};

const MyEventsAdminView: FC<MyEventsAdminViewProps> = (props) => {
  const { userId } = props;
  const navigate = useNavigate();
  const [showPastEvents, setShowPastEvents] = useState<boolean>(false);
  const [showUpcomingEvents, setShowUpcomingEvents] = useState<boolean>(true);
  const [deleteEventId, setDeleteEventId] = useState<string>('init');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deletedEvent, setDeletedEvent] = useState<boolean>(false);
  const [deleteModalContent, setDeleteModalContent] = useState<string>(
    'Are you sure you want to delete this event? This is an irreversible action.',
  );

  const { userEventsData = [], numberOfEvents, isLoading, isError, setApiPage } = useGetEventsByUser(userId);

  const sortedUserEvents = userEventsData.sort((a, b) =>
    dayjs(a.eventStartDate).utc().isBefore(dayjs(b.eventStartDate).utc(), 'day') ? -1 : 1,
  );

  const upcomingEvents = sortedUserEvents.filter((event) =>
    dayjs(event.eventEndDate).utc().isAfter(dayjs().utc(), 'day'),
  );
  const pastEvents = sortedUserEvents.filter((event) => dayjs(event.eventEndDate).utc().isBefore(dayjs().utc(), 'day'));

  const orderedUserEvents = useMemo(() => {
    if (!showUpcomingEvents && !showPastEvents) {
      return [];
    } else if (showUpcomingEvents && !showPastEvents) {
      return upcomingEvents;
    } else if (showPastEvents && !showUpcomingEvents) {
      return pastEvents;
    } else {
      return [...upcomingEvents, ...pastEvents];
    }
  }, [showUpcomingEvents, showPastEvents, upcomingEvents, pastEvents]);

  const MyEventsTableRows: MyEventsColumnNames[] = orderedUserEvents.map((event) => ({
    id: event.eventId,
    name: event.eventName,
    genres: event.eventGenres?.join(', '),
    totalSeats: event.eventTotalSeats,
    registrations: event.eventRegisteredSeats ?? 0,
    startdate: dayjs(event.eventStartDate).local().format('DD MMM YYYY [at] hh:mm A'),
    enddate: dayjs(event.eventEndDate).local().format('DD MMM YYYY [at] hh:mm A'),
    status: event.eventStatus,
  }));

  const handleGetNextApiPage = () => {
    setApiPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (deleteEventId !== 'init') {
      setShowDeleteModal(true);
    }
  }, [deleteEventId]);

  const handleDeleteEventClick = (id: string) => {
    setDeleteEventId(id);
  };

  const handleDeleteEventAction = async (eventId: string) => {
    setDeleteLoading(true);
    const responseStatus = await sendDeleteEvent(eventId);
    if (responseStatus !== 200) {
      setDeleteModalContent('There was an error deleting this event. Please try again later.');
    }
    setDeleteLoading(false);
    setDeletedEvent(true);
    setDeleteModalContent('Event deleted successfully!');
  };

  const handleCloseDeleteDialog = (e: object, reason: string) => {
    if (reason !== 'backdropClick' && reason == 'escapeKeyDown') {
      return;
    }
    setShowDeleteModal(false);
    setDeletedEvent(false);
    setDeleteEventId('init');
    if (deletedEvent) {
      navigate('/user/');
    }
  };

  return (
    <>
      <DeleteModal
        eventId={deleteEventId}
        open={showDeleteModal}
        content={deleteModalContent}
        handleClose={handleCloseDeleteDialog}
        handleConfirm={(id: string) => handleDeleteEventAction(id)}
        buttonloading={deleteLoading}
        buttonDisabled={deletedEvent}
      />
      <Table
        headerAlign="center"
        rowAlign="center"
        isLoading={isLoading}
        rowsPerPage={6}
        friendlyScreenMessage={isError ? 'Error loading events, please try again later.' : 'No events created yet!'}
        columns={MyEventsTableColumns}
        rows={MyEventsTableRows as RowType}
        handleViewClick={(id) => navigate(`/user/view-event/admin/${id}`)}
        handleEditClick={(id) => navigate(`/user/edit-event/${id}`)}
        handleDeleteClick={(id) => handleDeleteEventClick(`${id}`)}
      />
      <div className={styles.adminEventsFooter}>
        <div className={styles.adminEventsFilter}>
          <Checkbox
            direction="row"
            items={[
              {
                type: 'primary',
                checked: showPastEvents,
                label: 'Show Past Events',
                onClick: () => {
                  setShowPastEvents((prev) => !prev);
                },
              },
              {
                type: 'secondary',
                checked: showUpcomingEvents,
                label: 'Show Upcoming Events',
                onClick: () => {
                  setShowUpcomingEvents((prev) => !prev);
                },
              },
            ]}
          />
        </div>
        <div className={styles.adminEventsInfoContainer}>
          <div className={styles.adminEventsInfoWrapper}>
            <span className={styles.adminEventsInfo}>
              Total Events: <span className={styles.adminEventsCount}>{numberOfEvents}</span>
            </span>
            <span className={styles.adminEventsInfo}>
              Visible Events: <span className={styles.adminEventsCount}>{orderedUserEvents.length}</span>
            </span>
          </div>
          <Button label="Load More Events" onClick={handleGetNextApiPage} />
        </div>
      </div>
    </>
  );
};
export { MyEventsAdminView };
