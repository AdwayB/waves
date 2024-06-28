import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
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
import { BulkEventsResponse, Event, User, calculateDistance, getCardData } from '../../helpers';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation } from 'react-query';
import { getBulkEvents } from '../../utils/API/eventAPICalls';
import { getUserByIDList } from '../../utils';

const BrowseEvents: FC = () => {
  document.title = 'Browse Events - Waves';
  const [genres, setGenres] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [apiPage, setApiPage] = useState<number>(1);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [eventsFetched, setEventsFetched] = useState<boolean>(false);
  const [eventData, setEventData] = useState<Event[] | undefined>([]);
  const [usersData, setUsersData] = useState<User[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterTypes>({ startDate: null, endDate: null, distance: 0, genres: [] });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortMethod, setSortMethod] = useState<SortMethods>('date-asc');
  const [filteredEvents, setFilteredEvents] = useState<Event[] | undefined>([]);
  const [eventsFiltered, setEventsFiltered] = useState<boolean>(false);
  const [mappedCardData, setMappedCardData] = useState<CardProps[]>([{}]);
  const [displayData, setDisplayData] = useState<CardProps[]>([{}]);
  const [error, setError] = useState<boolean>(false);

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

  const { mutate, isLoading } = useMutation(
    async (apiPage: number): Promise<BulkEventsResponse> => {
      const response = await getBulkEvents(apiPage, 50);
      return response.data as BulkEventsResponse;
    },
    {
      onSuccess: (data) => {
        setTotalEvents(data.numberOfEvents);
        setEventData((prev) => {
          if (!prev) return data?.events;
          const filteredEvents = prev.filter((event) => {
            return !data?.events?.some((e) => e.eventId === event.eventId);
          });
          return [...filteredEvents, ...(data?.events ?? [])];
        });
        setEventsFetched(true);
      },
      onError: (error) => {
        console.error('Error during getBulkEvents:', error);
        setError(true);
      },
    },
  );

  useEffect(() => {
    mutate(apiPage);
  }, [apiPage, mutate]);

  useEffect(() => {
    setPageCount(Math.ceil(mappedCardData.length / pageLength));
  }, [mappedCardData, pageLength]);

  useEffect(() => {
    const genreArray: string[] = [];
    eventData?.forEach((event) => {
      event.eventGenres?.forEach((genre) => {
        if (!genreArray.includes(genre)) genreArray.push(genre);
      });
    });
    setGenres(genreArray.sort());
  }, [eventData]);

  useEffect(() => {
    const start = (page - 1) * pageLength;
    const end = start + pageLength;
    setDisplayData(mappedCardData.slice(start, end));
  }, [mappedCardData, page, pageLength]);

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

  const handlePageChange = (e: ChangeEvent<unknown>, v: number) => {
    setPage(v);
  };

  const usersDataCallback = useCallback(
    async (events: Event[]) => {
      const artistIDs: string[] = [];
      events
        .filter((id) => id.eventCreatedBy !== '' && !usersData?.some((u) => u.UserId === id))
        .forEach((event) => {
          artistIDs.push(event.eventCreatedBy ?? '');
        });
      const userDataResponse = (await getUserByIDList(artistIDs)).data as User[];
      return userDataResponse;
    },
    [usersData],
  );

  useEffect(() => {
    if (eventsFetched && eventData && eventData.length > 0) {
      const fetchUserData = async (events: Event[]) => {
        const userDataResponse = await usersDataCallback(events);

        setLoading(false);
        setUsersData((prev) => {
          if (prev) {
            return [...prev, ...userDataResponse];
          }
          return userDataResponse;
        });
      };

      fetchUserData(eventData);
    }
  }, [eventsFetched, eventData, usersDataCallback]);

  const applyFilters = useCallback(
    (events: Event[]) => {
      let filteredEvents = dateFilter(events, filters.startDate, filters.endDate);
      filteredEvents = distanceFilter(filteredEvents, filters.distance, userLocation);
      filteredEvents = genreFilter(filteredEvents, filters.genres);
      return filteredEvents;
    },
    [filters, userLocation],
  );

  useEffect(() => {
    if (eventsFetched && eventData && eventData.length > 0) {
      const filteredEvents = applyFilters(eventData);
      setFilteredEvents(filteredEvents);
      setEventsFiltered(true);
    }
  }, [eventsFetched, eventData, applyFilters]);

  useEffect(() => {
    if (eventsFiltered && filteredEvents && filteredEvents.length > 0) {
      const mappedEvents = getCardData(filteredEvents, usersData as User[]);
      const searchResults = getSearchResults(mappedEvents, searchTerm);
      const sortedResults = sortResult(searchResults, sortMethod);
      setMappedCardData(sortedResults);
    }
  }, [eventsFiltered, filteredEvents, searchTerm, sortMethod, usersData]);

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
      {loading || isLoading ? (
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
        <Button label="Load More Events" onClick={() => setApiPage((prev) => prev + 1)} />
      </div>
    </div>
  );
};
export { BrowseEvents };
