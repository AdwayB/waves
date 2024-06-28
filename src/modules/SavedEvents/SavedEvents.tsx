import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styles from './savedEvents.module.scss';
import { Event, EventTestData, UserTestData, calculateDistance, getCardData } from '../../helpers';
import {
  CardProps,
  EventFilter,
  FilterTypes,
  PaginatedCards,
  Search,
  Sort,
  SortMethods,
  Tooltip,
} from '../../components';
import dayjs, { Dayjs } from 'dayjs';

const SavedEvents: FC = () => {
  document.title = 'Saved Events - Waves';
  const EventData = EventTestData;
  const UserData = UserTestData;
  const [savedEventsNumber, setSavedEventsNumber] = useState<number>(0);
  const [genres, setGenres] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [filters, setFilters] = useState<FilterTypes>({ startDate: null, endDate: null, distance: 0, genres: [] });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortMethod, setSortMethod] = useState<SortMethods>('date-asc');
  const [mappedCardData, setMappedCardData] = useState<CardProps[]>([{}]);
  const [displayData, setDisplayData] = useState<CardProps[]>([{}]);

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
    setPageCount(Math.ceil(mappedCardData.length / pageLength));
  }, [mappedCardData, pageLength]);

  useEffect(() => {
    const genreArray: string[] = [];
    EventData.forEach((event) => {
      event.eventGenres?.forEach((genre) => {
        if (!genreArray.includes(genre)) genreArray.push(genre);
      });
    });
    setGenres(genreArray.sort());
  }, [EventData]);

  useEffect(() => {
    const start = (page - 1) * pageLength;
    const end = start + pageLength;
    setDisplayData(mappedCardData.slice(start, end));
  }, [mappedCardData, page, pageLength]);

  const mapCardData = useCallback((events: Event[]) => getCardData(events, UserData), [UserData]);

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
        const xCoord = event.eventLocation?.Coordinates[0] ?? userLocation[0];
        const yCoord = event.eventLocation?.Coordinates[1] ?? userLocation[1];
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

  useEffect(() => {
    let events = EventData;
    setSavedEventsNumber(events.length);
    events = dateFilter(events, filters.startDate, filters.endDate);
    events = distanceFilter(events, filters.distance, userLocation);
    events = genreFilter(events, filters.genres);

    let mappedEvents = mapCardData(events);
    mappedEvents = getSearchResults(mappedEvents, searchTerm);
    mappedEvents = sortResult(mappedEvents, sortMethod);

    setMappedCardData(mappedEvents);
  }, [EventData, genres, filters, mapCardData, pageLength, searchTerm, sortMethod, userLocation, UserData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleSortChange = (sort: SortMethods) => {
    console.log(sort);
    setSortMethod(sort);
    setPage(1);
  };

  return (
    <div className={styles.savedEventsContainer}>
      <div className={styles.savedEventsHeader}>
        <div className={styles.savedEventsHeadingGroup}>
          <Tooltip
            text="Events are automatically removed from your saved events after their completion."
            placement="right"
          >
            <span className={styles.savedEventsHeading}>
              You have <span className={styles.savedEventsCount}>{savedEventsNumber}</span> Saved Events.
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
      <PaginatedCards data={displayData} page={page} pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export { SavedEvents };
