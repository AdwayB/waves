import { useQuery } from 'react-query';
import { useState, useCallback, useMemo } from 'react';
import { BulkEventsResponse, Event, UserData } from '../helpers';
import { getBulkEvents, getUserByIDList } from '../utils';

const fetchEvents = async (apiPage: number) => {
  console.log('fetching events');

  const { data } = await getBulkEvents(apiPage, 50);
  return data as BulkEventsResponse;
};

const fetchUsers = async (artistIds: string[]) => {
  if (!artistIds || artistIds.length === 0) {
    throw new Error('No artist IDs provided');
  }

  console.log('fetching users');

  const { data } = await getUserByIDList(artistIds);
  return data as UserData[];
};

const useGetEventsAndUsers = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [apiPage, setApiPage] = useState(1);

  const memoizedFetchEvents = useCallback(() => fetchEvents(apiPage), [apiPage]);

  const { isLoading: eventsLoading, isError: eventsError } = useQuery(['getEvents', apiPage], memoizedFetchEvents, {
    keepPreviousData: true,
    onSuccess: (data) => {
      setTotalEvents(data.numberOfEvents);
      setEventData((prevEvents) => {
        const uniqueEvents = data.events?.filter(
          (event) => !prevEvents.some((prevEvent) => prevEvent.eventId === event.eventId),
        );
        if (!uniqueEvents) return prevEvents;
        return [...prevEvents, ...uniqueEvents];
      });
    },
  });

  const memoizedArtistIds = useMemo(() => {
    const newArtistIds = new Set<string>();
    eventData.forEach((event) => {
      newArtistIds.add(event?.eventCreatedBy ?? '');
    });
    newArtistIds.delete('');
    return Array.from(newArtistIds);
  }, [eventData]);

  const memoizedFetchUsers = useCallback(() => fetchUsers(memoizedArtistIds), [memoizedArtistIds]);

  const {
    data: userData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery(['getUsers', memoizedArtistIds], memoizedFetchUsers, {
    enabled: memoizedArtistIds.length > 0,
  });

  return {
    totalEvents,
    eventData,
    userData,
    isLoading: eventsLoading || usersLoading,
    isError: eventsError || usersError,
    setApiPage,
  };
};

export { useGetEventsAndUsers };
