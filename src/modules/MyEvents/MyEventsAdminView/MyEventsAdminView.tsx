import { FC } from 'react';
import { Button, ColumnType, RowType, Table } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useGetEventsByUser } from '../../../hooks';
import dayjs from 'dayjs';
import styles from './myEventsAdmin.module.scss';

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

const MyEventsAdminView: FC<MyEventsAdminViewProps> = (props) => {
  const { userId } = props;
  const navigate = useNavigate();

  const { userEventsData = [], numberOfEvents, isLoading, isError, setApiPage } = useGetEventsByUser(userId);

  const sortedUserEvents = userEventsData.sort((a, b) =>
    dayjs(a.eventStartDate).utc().isBefore(dayjs(b.eventStartDate).utc(), 'day') ? -1 : 1,
  );

  const upcomingEvents = sortedUserEvents.filter((event) =>
    dayjs(event.eventEndDate).utc().isAfter(dayjs().utc(), 'day'),
  );
  const pastEvents = sortedUserEvents.filter((event) => dayjs(event.eventEndDate).utc().isBefore(dayjs().utc(), 'day'));

  const orderedUserEvents = [...upcomingEvents, ...pastEvents];

  const MyEventsTableRows: MyEventsColumnNames[] = orderedUserEvents
    .sort((a, b) => (dayjs(a.eventStartDate).utc().isBefore(dayjs(b.eventStartDate).utc(), 'day') ? -1 : 1))
    .map((event) => ({
      id: event.eventId,
      name: event.eventName,
      genres: event.eventGenres?.join(', '),
      totalSeats: event.eventTotalSeats,
      registrations: (event.eventTotalSeats ?? 0) - (event.eventRegisteredSeats ?? 0),
      startdate: dayjs(event.eventStartDate).local().format('DD MMM YYYY [at] hh:mm A'),
      enddate: dayjs(event.eventEndDate).local().format('DD MMM YYYY [at] hh:mm A'),
      status: event.eventStatus,
    }));

  const handleGetNextApiPage = () => {
    setApiPage((prev) => prev + 1);
  };

  return (
    <>
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
        handleDeleteClick={(id) => console.log('Delete id ' + id)}
      />
      <div className={styles.adminEventsFooter}>
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
    </>
  );
};
export { MyEventsAdminView };
