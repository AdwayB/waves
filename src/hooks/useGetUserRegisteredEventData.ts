import { useCallback, useEffect, useState } from 'react';
import { Event, UserDataResponse, UserEventRegistrations } from '../helpers';
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
  return data as UserDataResponse[];
};

const useGetUserRegisteredEventData = (userID: string) => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [apiPage, setApiPage] = useState<number>(1);
  const [artistIds, setArtistIds] = useState<string[]>([]);

  const memoizedFetchRegisteredEvents = useCallback(() => fetchRegisteredEvents(userID, apiPage), [userID, apiPage]);
  const memoizedFetchUsers = useCallback(() => fetchUsers(artistIds), [artistIds]);

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

  useEffect(() => {
    if (!!eventData && eventData.length > 0) {
      const newArtistIds = new Set(artistIds);
      eventData
        .filter((event) => event.eventCreatedBy && !newArtistIds.has(event.eventCreatedBy))
        .forEach((event) => {
          newArtistIds.add(event?.eventCreatedBy ?? '');
        });
      newArtistIds.delete('');

      setArtistIds(Array.from(newArtistIds));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData]);

  const {
    data: userData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery(['getUsers', artistIds], memoizedFetchUsers, {
    enabled: artistIds.length > 0,
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
