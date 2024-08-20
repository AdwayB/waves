import { useCallback, useMemo, useState } from 'react';
import { Event, UserData, UserEventRegistrations } from '../helpers';
import { getUserByIDList, getUserRegistrations } from '../utils';
import { useQuery } from 'react-query';

const fetchRegisteredEvents = async (userID: string, apiPage: number) => {
  console.log('fetching registered events');

  const { data } = await getUserRegistrations(userID, apiPage, 100);
  return data as UserEventRegistrations;
};

const fetchUsers = async (artistIds: string[]) => {
  if (!artistIds || artistIds.length === 0) {
    throw new Error('No artist IDs provided');
  }

  console.log('fetching users');

  const { data } = await getUserByIDList(artistIds);
  return data as UserData[];
};

const useGetUserRegisteredEventData = (userID: string) => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [apiPage, setApiPage] = useState<number>(1);

  const memoizedFetchRegisteredEvents = useCallback(() => fetchRegisteredEvents(userID, apiPage), [userID, apiPage]);

  const {
    data: registeredEventsData,
    isLoading: registeredEventsLoading,
    isError: registeredEventsError,
  } = useQuery(['getRegisteredEvents', userID, apiPage], memoizedFetchRegisteredEvents, {
    enabled: !!userID,
    keepPreviousData: true,
    onSuccess: (data) => {
      setEventData((prevEvents) => {
        const uniqueEvents = data.registeredEvents?.filter(
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
    keepPreviousData: true,
  });

  return {
    registeredEventData: eventData,
    numberOfRegistrations: registeredEventsData?.numberOfRegistrations,
    userData,
    isLoading: registeredEventsLoading || usersLoading,
    isError: registeredEventsError || usersError,
    setApiPage,
  };
};

export { useGetUserRegisteredEventData };
