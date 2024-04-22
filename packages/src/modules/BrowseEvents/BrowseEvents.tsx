import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styles from './browseEvents.module.scss';
import { Card, CardProps, EventFilter, FilterTypes, Pagination, Search, Sort, SortMethods } from '../../components';
import { Event, EventTestData, UserTestData, calculateDistance } from '../../helpers';
import dayjs from 'dayjs';

const BrowseEvents: FC = () => {
  document.title = 'Browse Events - Waves';
  const EventData = EventTestData;
  const UserData = UserTestData;
  const [genres, setGenres] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(0);
  const [filters, setFilters] = useState<FilterTypes>({ startDate: null, endDate: null, distance: 0, genres: [] });
  const [searchTerm, setSearchTerm] = useState<string>();
  const [sortMethod, setSortMethod] = useState<SortMethods>('date-asc');
  const [displayData, setDisplayData] = useState<CardProps[]>([{}]);
  const pageCount = Math.ceil(displayData.length / pageLength);

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

  useEffect(() => {
    setGenres((prev) => [...prev, ...EventData.map((event) => event.EventGenres).flat()]);
  }, [EventData]);

  const mapCardData = useCallback(
    (eventData: Event[]): CardProps[] => {
      return eventData.map((event) => {
        const artistInfo = UserData.find((user) => user.UserId === event.EventCreatedBy);
        return {
          title: event.EventName,
          artist: artistInfo?.LegalName || 'Unknown Artist',
          genres: event.EventGenres.join(','),
          rating: Math.floor(Math.random() * 5) + 1,
        };
      });
    },
    [UserData],
  );

  const filterData = useCallback(() => {
    let result = EventData;

    if (filters.startDate || filters.endDate) {
      result = result.filter((event) => {
        const eventDate = dayjs(event.EventStartDate);
        return (
          (!filters.startDate || eventDate.isAfter(filters.startDate, 'day')) &&
          (!filters.endDate || eventDate.isBefore(filters.endDate, 'day'))
        );
      });
    }

    if (filters.distance) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error obtaining location', error);
        },
      );

      if (!userLocation) alert('Error: User location not found.');

      result = result.filter((event) => {
        if (!!userLocation && filters.distance && event.EventLocation.Coordinates) {
          const [eventLat, eventLon] = event.EventLocation.Coordinates;
          const distance = calculateDistance(userLocation, [eventLat, eventLon]);
          return distance <= filters.distance;
        }
        return true;
      });
    }

    if (filters?.genres && filters.genres.length > 0) {
      result = result.filter((event) => event.EventGenres.some((genre) => filters?.genres?.includes(genre)));
    }

    result.sort((a, b) => {
      return dayjs(a.EventStartDate).isBefore(b.EventStartDate, 'day') ? -1 : 1;
    });

    var intermediateResult = mapCardData(result);

    if (searchTerm) {
      intermediateResult = intermediateResult.filter(
        (card) =>
          card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.genres?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    intermediateResult.sort((a, b) => {
      switch (sortMethod) {
        case 'name-asc':
          return a.title?.localeCompare(b.title ?? '') ?? 0;
        case 'name-desc':
          return b.title?.localeCompare(a.title ?? '') ?? 0;
        case 'artist-asc':
          return a.artist?.localeCompare(b.artist ?? '') ?? 0;
        case 'artist-desc':
          return b.artist?.localeCompare(a.artist ?? '') ?? 0;
        case 'rating-asc':
          return (a.rating ?? 0) - (b.rating ?? 0) ?? 0;
        case 'rating-desc':
          return (b.rating ?? 0) - (a.rating ?? 0) ?? 0;
        default:
          return 0;
      }
    });

    setDisplayData(intermediateResult.slice((page - 1) * pageLength, page * pageLength));
  }, [EventData, filters, mapCardData, page, pageLength, searchTerm, sortMethod, userLocation]);

  useEffect(() => {
    filterData();
  }, [filters, filterData]);

  const handlePageChange = (e: ChangeEvent<unknown>, v: number) => {
    setPage(v);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleSortChange = (sort: SortMethods) => {
    setSortMethod(sort);
    setPage(1);
  };

  return (
    <div className={styles.browseEventsContainer}>
      <div className={styles.browseEventsHeader}>
        <span className={styles.browseEventsHeading}>Browse All Events</span>
        <span className={styles.browseEventsText}>
          Browse all upcoming events, use the filters to narrow your results.
        </span>
      </div>
      <div className={styles.browseEventsFilters}>
        <EventFilter onFilterChange={setFilters} genres={genres} />
        <div className={styles.searchSortWrapper}>
          <span className={styles.searchWrapper}>
            <Search value="" onChange={handleSearchChange} />
          </span>
          <span className={styles.sortWrapper}>
            <Sort onSortChange={handleSortChange} />
          </span>
        </div>
      </div>
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
