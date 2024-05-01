import { FC, useState } from 'react';
import styles from './myEvents.module.scss';
import { ColumnType, Table } from '../../components';

const MyEventsTableColumns: ColumnType[] = [
  { id: 0, title: 'Name', name: 'name' },
  { id: 1, title: 'Genres', name: 'genres' },
  { id: 2, title: 'Total Seats', name: 'totalSeats' },
  { id: 3, title: 'Registrations', name: 'registrations' },
  { id: 4, title: 'Ticket Price', name: 'ticketprice' },
  { id: 5, title: 'Start Date', name: 'startdate' },
  { id: 6, title: 'End Date', name: 'enddate' },
  { id: 7, title: 'Status', name: 'status' },
];

interface MyEventsColumnNames {
  name?: string;
  genres?: string;
  totalSeats?: number;
  registrations?: number;
  ticketprice?: number;
  startdate?: string;
  enddate?: string;
  status?: string;
}

const MyEventsTableRows: MyEventsColumnNames[] = [
  {
    name: 'Event Name',
    genres: 'Rock, Pop',
    totalSeats: 100,
    registrations: 80,
    ticketprice: 100,
    startdate: '2022-01-01',
    enddate: '2022-01-31',
    status: 'Active',
  },
];

const MyEvents: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate API delay
  const falseLoading = () => setIsLoading(false);
  setTimeout(falseLoading, 1500);

  return (
    <div className={styles.myEventsContainer}>
      <div className={styles.myEventsHeader}>
        <span className={styles.myEventsHeading}>My Events</span>
        <span className={styles.myEventsText}>View your events and registrations.</span>
      </div>
      <div className={styles.myEventsTable}>
        <Table
          headerAlign="center"
          rowAlign="center"
          isLoading={isLoading}
          friendlyScreenMessage="No events created yet!"
          columns={MyEventsTableColumns}
          rows={MyEventsTableRows as Record<string, string | number | boolean>[]}
        />
      </div>
    </div>
  );
};
export { MyEvents };
