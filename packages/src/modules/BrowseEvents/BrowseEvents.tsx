import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './browseEvents.module.scss';
import { Card, CardProps, Pagination } from '../../components';

const TestData: CardProps[] = [
  { title: 'Test Event', artist: 'Test Artist', genres: 'Test Genres', rating: 1 },
  { title: 'Test Event 2', artist: 'Test Artist 2', genres: 'Test Genres 2', rating: 1.5 },
  { title: 'Test Event 3', artist: 'Test Artist 3', genres: 'Test Genres 3', rating: 2 },
  { title: 'Test Event 4', artist: 'Test Artist 4', genres: 'Test Genres 4', rating: 2.5 },
  { title: 'Test Event 5', artist: 'Test Artist 5', genres: 'Test Genres 5', rating: 3 },
  { title: 'Test Event 6', artist: 'Test Artist 6', genres: 'Test Genres 6', rating: 3.5 },
  { title: 'Test Event 7', artist: 'Test Artist 7', genres: 'Test Genres 7', rating: 4 },
  { title: 'Test Event 8', artist: 'Test Artist 8', genres: 'Test Genres 8', rating: 4.5 },
  { title: 'Test Event 9', artist: 'Test Artist 9', genres: 'Test Genres 9', rating: 5 },
  { title: 'Test Event 10', artist: 'Test Artist 10', genres: 'Test Genres 10', rating: 1 },
  { title: 'Test Event 11', artist: 'Test Artist 11', genres: 'Test Genres 11', rating: 1.5 },
  { title: 'Test Event 12', artist: 'Test Artist 12', genres: 'Test Genres 12', rating: 2 },
  { title: 'Test Event 13', artist: 'Test Artist 13', genres: 'Test Genres 13', rating: 2.5 },
  { title: 'Test Event 14', artist: 'Test Artist 14', genres: 'Test Genres 14', rating: 3 },
  { title: 'Test Event 15', artist: 'Test Artist 15', genres: 'Test Genres 15', rating: 3.5 },
  { title: 'Test Event 16', artist: 'Test Artist 16', genres: 'Test Genres 16', rating: 4 },
  { title: 'Test Event 17', artist: 'Test Artist 17', genres: 'Test Genres 17', rating: 4.5 },
  { title: 'Test Event 18', artist: 'Test Artist 18', genres: 'Test Genres 18', rating: 5 },
  { title: 'Test Event 19', artist: 'Test Artist 19', genres: 'Test Genres 19', rating: 5 },
  { title: 'Test Event 20', artist: 'Test Artist 20', genres: 'Test Genres 20', rating: 0 },
  { title: 'Test Event 21', artist: 'Test Artist 21', genres: 'Test Genres 21', rating: 0 },
  { title: 'Test Event 22', artist: 'Test Artist 22', genres: 'Test Genres 22', rating: 0 },
  { title: 'Test Event 23', artist: 'Test Artist 23', genres: 'Test Genres 23', rating: 0 },
  { title: 'Test Event 24', artist: 'Test Artist 24', genres: 'Test Genres 24', rating: 0 },
  { title: 'Test Event 25', artist: 'Test Artist 25', genres: 'Test Genres 25', rating: 0 },
  { title: 'Test Event 26', artist: 'Test Artist 26', genres: 'Test Genres 26', rating: 0 },
  { title: 'Test Event 27', artist: 'Test Artist 27', genres: 'Test Genres 27', rating: 0 },
  { title: 'Test Event 28', artist: 'Test Artist 28', genres: 'Test Genres 28', rating: 0 },
  { title: 'Test Event 29', artist: 'Test Artist 29', genres: 'Test Genres 29', rating: 0 },
  { title: 'Test Event 30', artist: 'Test Artist 30', genres: 'Test Genres 30', rating: 0 },
  { title: 'Test Event 31', artist: 'Test Artist 31', genres: 'Test Genres 31', rating: 0 },
  { title: 'Test Event 32', artist: 'Test Artist 32', genres: 'Test Genres 32', rating: 0 },
  { title: 'Test Event 33', artist: 'Test Artist 33', genres: 'Test Genres 33', rating: 0 },
  { title: 'Test Event 34', artist: 'Test Artist 34', genres: 'Test Genres 34', rating: 0 },
  { title: 'Test Event 35', artist: 'Test Artist 35', genres: 'Test Genres 35', rating: 0 },
  { title: 'Test Event 36', artist: 'Test Artist 36', genres: 'Test Genres 36', rating: 0 },
  { title: 'Test Event 37', artist: 'Test Artist 37', genres: 'Test Genres 37', rating: 0 },
  { title: 'Test Event 38', artist: 'Test Artist 38', genres: 'Test Genres 38', rating: 0 },
  { title: 'Test Event 39', artist: 'Test Artist 39', genres: 'Test Genres 39', rating: 0 },
  { title: 'Test Event 40', artist: 'Test Artist 40', genres: 'Test Genres 40', rating: 0 },
];

const BrowseEvents: FC = () => {
  document.title = 'Browse Events - Waves';
  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(0);
  const [displayData, setDisplayData] = useState<CardProps[]>([{}]);
  const pageCount = Math.ceil(TestData.length / pageLength);

  useEffect(() => {
    const start = (page - 1) * pageLength;
    const end = start + pageLength;
    setDisplayData(TestData.slice(start, end));
  }, [page, pageLength]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1366) {
        setPageLength(8);
        if (window.innerWidth < 1165) setPageLength(6);
        if (window.innerWidth < 768) setPageLength(4);
        if (window.innerWidth < 615) setPageLength(3);
      } else {
        setPageLength(12);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePageChange = (e: ChangeEvent<unknown>, v: number) => {
    setPage(v);
  };

  return (
    <div className={styles.browseEventsContainer}>
      <div className={styles.browseEventsHeader}>
        <span className={styles.browseEventsHeading}>Browse All Events</span>
        <span className={styles.browseEventsText}>
          Browse all upcoming events, use the filters to narrow your results.
        </span>
      </div>
      <div className={styles.browseEventsFilters}>{/* <EventFilter /> */}</div>
      <div className={styles.browseEventsPaginatedGroup}>
        <div className={styles.browseEventsCardsContainer}>
          {displayData.map((event, index) => (
            <div className={styles.card} key={index}>
              <Card key={index} title={event.title} artist={event.artist} genres={event.genres} rating={event.rating} />
            </div>
          ))}
        </div>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          className={styles.browseEventsPagination}
        />
      </div>
    </div>
  );
};
export { BrowseEvents };
