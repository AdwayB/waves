import { FC } from 'react';
import { Button, ColumnType, RowType, Table } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useGetUserRegisteredEventData } from '../../../hooks';
import dayjs from 'dayjs';
import styles from './myEventsUser.module.scss';

const MyEventsTableColumns: ColumnType[] = [
  { id: 0, title: 'Name', name: 'name' },
  { id: 1, title: 'Genres', name: 'genres' },
  { id: 2, title: 'Created By', name: 'createdBy' },
  { id: 3, title: 'Start Date', name: 'startdate' },
  { id: 4, title: 'End Date', name: 'enddate' },
  { id: 5, title: 'Status', name: 'status' },
];

interface MyEventsColumnNames {
  name?: string;
  genres?: string;
  createdBy?: string;
  startdate?: string;
  enddate?: string;
  status?: string;
}

interface MyEventsUserViewProps {
  userId: string;
}

const MyEventsUserView: FC<MyEventsUserViewProps> = (props) => {
  const { userId } = props;
  const navigate = useNavigate();

  const { registeredEventData, numberOfRegistrations, userData, isLoading, isError, setApiPage } =
    useGetUserRegisteredEventData(userId);

  registeredEventData.forEach((event) => {
    if (event?.eventCreatedBy && !!userData) {
      const artistName = userData.find((user) => user.userId === event.eventCreatedBy)?.legalName;
      event.eventCreatedBy = artistName;
    }
  });

  const sortedUserRegistrations = registeredEventData.sort((a, b) =>
    dayjs(a.eventStartDate).utc().isBefore(dayjs(b.eventStartDate).utc(), 'day') ? -1 : 1,
  );

  const upcomingEvents = sortedUserRegistrations.filter((event) =>
    dayjs(event.eventEndDate).utc().isAfter(dayjs().utc(), 'day'),
  );
  const pastEvents = sortedUserRegistrations.filter((event) =>
    dayjs(event.eventEndDate).utc().isBefore(dayjs().utc(), 'day'),
  );

  const orderedUserRegistrations = [...upcomingEvents, ...pastEvents];

  const MyEventsTableRows: MyEventsColumnNames[] = orderedUserRegistrations
    .sort((a, b) => (dayjs(a.eventStartDate).utc().isBefore(dayjs(b.eventStartDate).utc(), 'day') ? -1 : 1))
    .map((event) => ({
      id: event.eventId,
      name: event.eventName,
      genres: event.eventGenres?.join(', '),
      createdBy: event.eventCreatedBy,
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
        handleViewClick={(id) => navigate(`/user/view-event/${id}`)}
        showEdit={false}
        showDelete={false}
      />
      <div className={styles.userEventsFooter}>
        <div className={styles.userEventsInfoWrapper}>
          <span className={styles.userEventsInfo}>
            Total Events: <span className={styles.userEventsCount}>{numberOfRegistrations}</span>
          </span>
          <span className={styles.userEventsInfo}>
            Visible Events: <span className={styles.userEventsCount}>{orderedUserRegistrations.length}</span>
          </span>
        </div>
        <Button label="Load More Events" onClick={handleGetNextApiPage} />
      </div>
    </>
  );
};
export { MyEventsUserView };
