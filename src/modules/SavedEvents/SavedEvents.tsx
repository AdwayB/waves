import { ChangeEvent, FC, memo, useEffect, useMemo, useState } from 'react';
import styles from './savedEvents.module.scss';
import { Event, UserSavedEvents, calculateDistance, getCardData } from '../../helpers';
import {
  Alert,
  CardProps,
  EventFilter,
  FilterTypes,
  FriendlyScreenWithPagination,
  LoadingWithPagination,
  PaginatedCards,
  Search,
  Sort,
  SortMethods,
  Tooltip,
} from '../../components';
import dayjs, { Dayjs } from 'dayjs';
import { useGetSavedEventsAndUsers } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setSavedEvents } from '../../redux';
import { getSavedEvents } from '../../utils';

const fetchSavedEventIDs = async () => {
  console.log('fetching saved events');

  const { data } = await getSavedEvents();
  return data as UserSavedEvents;
};

const MemoizedSavedEvents: FC = () => {
  document.title = 'Saved Events - Waves';
  const dispatch = useDispatch();
  const [savedEventIDs, setSavedEventIDs] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(1);
  const [filters, setFilters] = useState<FilterTypes>({ startDate: null, endDate: null, distance: 0, genres: [] });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortMethod, setSortMethod] = useState<SortMethods>('date-asc');
  const [mappedCardData, setMappedCardData] = useState<CardProps[]>([{}]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSavedEventIDs();
        if (data.events) {
          setSavedEventIDs(data.events);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const { totalEvents, eventData, userData, isLoading, isError } = useGetSavedEventsAndUsers(savedEventIDs);

  eventData && dispatch(setSavedEvents(eventData));

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
    if (eventData.length === 0) {
      return;
    }
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
    if (eventData.length === 0) return [];
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

  return (
    <div className={styles.savedEventsContainer}>
      <Alert visible={error} severity="error" onClose={() => setError(false)}>
        Error in fetching saved events. Please try again later.
      </Alert>
      <div className={styles.savedEventsHeader}>
        <div className={styles.savedEventsHeadingGroup}>
          <Tooltip
            text="Events are automatically removed from your saved events after their completion."
            placement="right"
          >
            <span className={styles.savedEventsHeading}>
              You have <span className={styles.savedEventsCount}>{totalEvents}</span> Saved Events.
            </span>
          </Tooltip>
          <span className={styles.savedEventsText}>
            View all your saved events, use the filters to narrow your results.
          </span>
        </div>
      </div>
      <div className={styles.savedEventsFilters}>
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
        <div className={styles.savedEventsLoading}>
          <LoadingWithPagination />
        </div>
      ) : eventData.length === 0 ? (
        <FriendlyScreenWithPagination friendlyScreenHeight="500px" />
      ) : (
        <PaginatedCards data={displayData} page={page} pageCount={pageCount} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

const SavedEvents = memo(MemoizedSavedEvents);

export { SavedEvents };
