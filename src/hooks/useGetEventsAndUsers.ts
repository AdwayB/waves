import { useQuery } from 'react-query';
import { useState, useEffect, useCallback } from 'react';
import { BulkEventsResponse, Event, UserDataResponse } from '../helpers';
import { getBulkEvents, getUserByIDList } from '../utils';

const fetchEvents = async (apiPage: number) => {
  console.log('fetching events');

  const { data } = await getBulkEvents(apiPage, 50);
  return data as BulkEventsResponse;
};

const fetchUsers = async (artistIds: string[]) => {
  console.log('fetching users');
  const { data } = await getUserByIDList(artistIds);
  return data as UserDataResponse[];
};

const useGetEventsAndUsers = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [uniqueArtistIds, setUniqueArtistIds] = useState<string[]>([]);
  const [apiPage, setApiPage] = useState(1);

  const memoizedFetchEvents = useCallback(() => fetchEvents(apiPage), [apiPage]);
  const memoizedFetchUsers = useCallback(() => fetchUsers(uniqueArtistIds), [uniqueArtistIds]);

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

  useEffect(() => {
    if (eventData.length > 0) {
      const newArtistIds = new Set(uniqueArtistIds);
      eventData
        .filter((event) => event.eventCreatedBy && !newArtistIds.has(event.eventCreatedBy))
        .forEach((event) => {
          newArtistIds.add(event?.eventCreatedBy ?? '');
        });
      newArtistIds.delete('');

      setUniqueArtistIds(Array.from(newArtistIds));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData]);

  const {
    data: userData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery(['getUsers', uniqueArtistIds], memoizedFetchUsers, {
    enabled: uniqueArtistIds.length > 0,
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
