import { ChangeEvent, FC, memo, useEffect, useMemo, useState } from 'react';
import styles from './browseEvents.module.scss';
import {
  Alert,
  Button,
  CardProps,
  EventFilter,
  FilterTypes,
  LoadingWithPagination,
  PaginatedCards,
  Search,
  Sort,
  SortMethods,
} from '../../components';
import { Event, calculateDistance, getCardData } from '../../helpers';
import dayjs, { Dayjs } from 'dayjs';
import { useGetEventsAndUsers } from './useGetEventsAndUsers';

const MemoizedBrowseEvents: FC = () => {
  document.title = 'Browse Events - Waves';
  const [genres, setGenres] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(1);
  const [filters, setFilters] = useState<FilterTypes>({ startDate: null, endDate: null, distance: 0, genres: [] });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortMethod, setSortMethod] = useState<SortMethods>('date-asc');
  const [mappedCardData, setMappedCardData] = useState<CardProps[]>([{}]);
  const [error, setError] = useState<boolean>(false);

  const { totalEvents, eventData, userData, isLoading, isError, setApiPage } = useGetEventsAndUsers();

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
    setError(isError);
  }, [isError]);

  useEffect(() => {
    const genreArray: string[] = [];
    eventData?.forEach((event) => {
      event.eventGenres?.forEach((genre) => {
        if (!genreArray.includes(genre)) genreArray.push(genre);
      });
    });
    setGenres(genreArray.sort());
  }, [eventData]);

  const dateFilter = (events: Event[], startDate?: Dayjs | null, endDate?: Dayjs | null) => {
    if (!startDate && !endDate) return events;

    return events.filter((event) => {
      const eventDate = dayjs(event.eventStartDate);
      if (startDate && endDate) return eventDate.isAfter(startDate, 'day') && eventDate.isBefore(endDate, 'day');
      if (startDate) return eventDate.isAfter(startDate, 'day');
      if (endDate) return eventDate.isBefore(endDate, 'day');
    });
  };

  const distanceFilter = (events: Event[], distance?: number, userLocation?: [number, number] | null) => {
    if (!distance) return events;
    if (!userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error obtaining location', error);
        },
      );
    }

    if (!userLocation) return events;
    if (distance) {
      return events.filter((event) => {
        const [xCoord, yCoord] = event.eventLocation?.Coordinates ?? userLocation;
        const dist = calculateDistance(userLocation, [xCoord, yCoord]);
        return dist <= distance;
      });
    }
    return events;
  };

  const genreFilter = (events: Event[], genres?: string[]) => {
    if (genres?.length === 0 || !genres) return events;

    return events.filter((event) => event.eventGenres?.some((genre) => genres?.includes(genre)));
  };

  const getSearchResults = (cardData: CardProps[], search?: string) => {
    if (!search || search.length === 0 || search === '') return cardData;

    return cardData.filter(
      (card) =>
        card.title?.toLowerCase().includes(search.toLowerCase()) ||
        card.artist?.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const sortResult = (cardData: CardProps[], sort: SortMethods) => {
    switch (sort) {
      case 'date-asc':
        return cardData.sort((a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix());
      case 'name-asc':
        return cardData.sort((a, b) => a.title?.localeCompare(b.title ?? '') ?? 1);
      case 'name-desc':
        return cardData.sort((a, b) => b.title?.localeCompare(a.title ?? '') ?? 1);
      case 'artist-asc':
        return cardData.sort((a, b) => a.artist?.localeCompare(b.artist ?? '') ?? 1);
      case 'artist-desc':
        return cardData.sort((a, b) => b.artist?.localeCompare(a.artist ?? '') ?? 1);
      case 'rating-asc':
        return cardData.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
      case 'rating-desc':
        return cardData.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return cardData;
    }
  };

  const filteredEvents = useMemo(() => {
    let result = dateFilter(eventData, filters.startDate, filters.endDate);
    result = distanceFilter(result, filters.distance, userLocation);
    result = genreFilter(result, filters.genres);
    return result;
  }, [eventData, filters, userLocation]);

  const searchAndSortResults = useMemo(() => {
    if (filteredEvents && filteredEvents.length > 0 && userData && userData.length > 0) {
      const mappedEvents = getCardData(filteredEvents, userData!);
      const searchResults = getSearchResults(mappedEvents, searchTerm);
      const sortedResults = sortResult(searchResults, sortMethod);
      return sortedResults;
    }
  }, [filteredEvents, searchTerm, sortMethod, userData]);

  useEffect(() => {
    if (searchAndSortResults) {
      setMappedCardData(searchAndSortResults);
    }
  }, [searchAndSortResults]);

  const pageCount = useMemo(() => {
    return Math.ceil(mappedCardData.length / pageLength);
  }, [mappedCardData.length, pageLength]);

  const displayData = useMemo(() => {
    const start = (page - 1) * pageLength;
    const end = start + pageLength;
    return mappedCardData.slice(start, end);
  }, [mappedCardData, page, pageLength]);

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

  const handleGetNextApiPage = () => {
    setApiPage((prev) => prev + 1);
  };

  return (
    <div className={styles.browseEventsContainer}>
      <Alert visible={error} severity="error" onClose={() => setError(false)}>
        Error in fetching events. Please try again later.
      </Alert>
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
            <Search value={searchTerm} onChange={handleSearchChange} />
          </span>
          <span className={styles.sortWrapper}>
            <Sort onSortChange={handleSortChange} />
          </span>
        </div>
      </div>
      {isLoading ? (
        <LoadingWithPagination />
      ) : (
        <PaginatedCards data={displayData} page={page} pageCount={pageCount} onPageChange={handlePageChange} />
      )}
      <div className={styles.browseEventsFooter}>
        <div className={styles.browseEventsInfoWrapper}>
          <span className={styles.browseEventsInfo}>
            Total Events: <span className={styles.browseEventsCount}>{totalEvents}</span>
          </span>
          <span className={styles.browseEventsInfo}>
            Visible Events: <span className={styles.browseEventsCount}>{mappedCardData.length}</span>
          </span>
        </div>
        <Button label="Load More Events" onClick={handleGetNextApiPage} />
      </div>
    </div>
  );
};

const BrowseEvents = memo(MemoizedBrowseEvents);

export { BrowseEvents };
