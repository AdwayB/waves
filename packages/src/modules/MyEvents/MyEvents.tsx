import { FC, useState } from 'react';
import styles from './myEvents.module.scss';
import { Button, ColumnType, RowType, Table } from '../../components';
import { EventTestData } from '../../helpers';
import dayjs from 'dayjs';

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

const MyEvents: FC = () => {
  document.title = 'My Events - Waves';
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const EventData = EventTestData;
  const userId = ['1', '2', '3', '4', '5'];

  const userEvents = EventData.filter((event) => userId.includes(event.EventCreatedBy));

  const MyEventsTableRows: MyEventsColumnNames[] = userEvents
    .sort((a, b) => (dayjs(a.EventStartDate).utc().isBefore(dayjs(b.EventStartDate).utc(), 'day') ? -1 : 1))
    .map((event) => ({
      id: event.EventId,
      name: event.EventName,
      genres: event.EventGenres.join(', '),
      totalSeats: event.EventTotalSeats,
      registrations: event.EventTotalSeats - event.EventRegisteredSeats,
      startdate: dayjs(event.EventStartDate).format('DD MMM YYYY [at] hh:mm A'),
      enddate: dayjs(event.EventEndDate).format('DD MMM YYYY [at] hh:mm A'),
      status: event.EventStatus,
    }));

  // Simulate API delay
  const falseLoading = () => setIsLoading(false);
  setTimeout(falseLoading, 1500);

  const handleSync = () => {
    setIsSyncing(true);
    console.log('Syncing...');
    setTimeout(() => {
      console.log('Sync complete!');
      setIsSyncing(false);
    }, 1000);
  };

  return (
    <div className={styles.myEventsContainer}>
      <div className={styles.myEventsHeader}>
        <div className={styles.myEventsHeading}>
          <span className={styles.myEventsTitle}>My Events</span>
          <span className={styles.myEventsText}>View your events and registrations.</span>
        </div>
        <Button
          buttontype="secondary"
          label="Sync My Events"
          onClick={handleSync}
          buttonloading={isSyncing}
          className={styles.syncButton}
        />
      </div>
      <div className={styles.myEventsTable}>
        <Table
          headerAlign="center"
          rowAlign="center"
          isLoading={isLoading}
          rowsPerPage={6}
          friendlyScreenMessage="No events created yet!"
          columns={MyEventsTableColumns}
          rows={MyEventsTableRows as RowType}
          handleViewClick={(id) => console.log('View id ' + id)}
          handleEditClick={(id) => console.log('Edit id ' + id)}
          handleDeleteClick={(id) => console.log('Delete id ' + id)}
        />
      </div>
    </div>
  );
};

export { MyEvents };
