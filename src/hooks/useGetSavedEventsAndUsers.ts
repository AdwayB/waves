import { useQuery } from 'react-query';
import { useState, useEffect, useCallback } from 'react';
import { Event, UserData } from '../helpers';
import { getEventsByIDList, getUserByIDList } from '../utils';

const fetchEvents = async (ids: string[]) => {
  if (!ids || ids.length === 0) {
    throw new Error('No event IDs provided');
  }

  console.log('fetching events');

  const { data } = await getEventsByIDList(ids);
  return data as Event[];
};

const fetchUsers = async (artistIds: string[]) => {
  if (!artistIds || artistIds.length === 0) {
    throw new Error('No artist IDs provided');
  }

  console.log('fetching users');

  const { data } = await getUserByIDList(artistIds);
  return data as UserData[];
};

const useGetSavedEventsAndUsers = (savedEventIDs: string[]) => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [uniqueArtistIds, setUniqueArtistIds] = useState<string[]>([]);

  const memoizedFetchEvents = useCallback(() => fetchEvents(savedEventIDs), [savedEventIDs]);
  const memoizedFetchUsers = useCallback(() => fetchUsers(uniqueArtistIds), [uniqueArtistIds]);

  const { isLoading: eventsLoading, isError: eventsError } = useQuery(
    ['getEvents', savedEventIDs],
    memoizedFetchEvents,
    {
      enabled: savedEventIDs.length >= 1,
      keepPreviousData: true,
      onSuccess: (data) => {
        setEventData((prevEvents) => {
          const uniqueEvents = data?.filter(
            (event) => event.eventId && !prevEvents.some((prevEvent) => prevEvent.eventId === event.eventId),
          );

          if (!uniqueEvents) {
            setTotalEvents(prevEvents.length);
            return prevEvents;
          }

          const newSetEvents = [...prevEvents, ...uniqueEvents];
          setTotalEvents(newSetEvents.length);
          return newSetEvents;
        });
      },
    },
  );

  useEffect(() => {
    if (eventData.length > 0) {
      const newArtistIds = new Set(uniqueArtistIds);
      eventData.forEach((event) => {
        const artistId = event.eventCreatedBy;
        if (artistId && artistId.trim() !== '' && !newArtistIds.has(artistId)) {
          newArtistIds.add(artistId);
        }
      });
      setUniqueArtistIds(Array.from(newArtistIds));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData]);

  const {
    data: userData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery(['getUsers', uniqueArtistIds], memoizedFetchUsers, {
    enabled: uniqueArtistIds.length >= 1,
  });

  if (savedEventIDs.length === 0) {
    return {
      totalEvents: 0,
      eventData: [],
      userData: [],
      isLoading: false,
      isError: false,
    };
  }

  return {
    totalEvents,
    eventData,
    userData,
    isLoading: eventsLoading || usersLoading,
    isError: eventsError || usersError,
  };
};

export { useGetSavedEventsAndUsers };
