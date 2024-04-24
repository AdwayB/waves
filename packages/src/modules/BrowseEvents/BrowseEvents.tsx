import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styles from './browseEvents.module.scss';
import { Card, CardProps, EventFilter, FilterTypes, Pagination, Search, Sort, SortMethods } from '../../components';
import { Event, EventTestData, UserTestData, calculateDistance } from '../../helpers';
import dayjs, { Dayjs } from 'dayjs';

const BrowseEvents: FC = () => {
  document.title = 'Browse Events - Waves';
  const EventData = EventTestData;
  const UserData = UserTestData;
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
      event.EventGenres.forEach((genre) => {
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

  const mapCardData = useCallback(
    (eventData: Event[]): CardProps[] => {
      return eventData.map((event) => {
        const artistInfo = UserData.find((user) => user.UserId === event.EventCreatedBy);
        return {
          title: event.EventName,
          artist: artistInfo?.LegalName || 'Unknown Artist',
          genres: event.EventGenres.join(', '),
          rating: Math.floor(Math.random() * 5) + 1,
          startDate: dayjs(event.EventStartDate),
        };
      });
    },
    [UserData],
  );

  const dateFilter = (events: Event[], startDate?: Dayjs | null, endDate?: Dayjs | null) => {
    if (!startDate && !endDate) return events;

    return events.filter((event) => {
      const eventDate = dayjs(event.EventStartDate);
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
        const xCoord = event.EventLocation.Coordinates[0];
        const yCoord = event.EventLocation.Coordinates[1];
        const dist = calculateDistance(userLocation, [xCoord, yCoord]);
        return dist <= distance;
      });
    }
    return events;
  };

  const genreFilter = (events: Event[], genres?: string[]) => {
    if (genres?.length === 0 || !genres) return events;

    return events.filter((event) => event.EventGenres.some((genre) => genres?.includes(genre)));
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
    events = dateFilter(events, filters.startDate, filters.endDate);
    events = distanceFilter(events, filters.distance, userLocation);
    events = genreFilter(events, filters.genres);

    let mappedEvents = mapCardData(events);
    mappedEvents = getSearchResults(mappedEvents, searchTerm);
    mappedEvents = sortResult(mappedEvents, sortMethod);

    setMappedCardData(mappedEvents);
  }, [EventData, genres, filters, mapCardData, pageLength, searchTerm, sortMethod, userLocation]);

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
            <Search value={searchTerm} onChange={handleSearchChange} />
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
              <Card
                key={index}
                title={event.title}
                artist={event.artist}
                genres={event.genres}
                rating={event.rating}
                startDate={event.startDate}
                staticBackground
              />
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
