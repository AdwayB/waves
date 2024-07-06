import { useCallback, useState } from 'react';
import { BulkEventsResponse, Event } from '../helpers';
import { getEventsByArtist } from '../utils';
import { useQuery } from 'react-query';

const fetchEventsByArtist = async (artistID: string, apiPage: number) => {
  if (!artistID || artistID.length === 0) {
    throw new Error('No artist ID provided');
  }

  console.log('fetching events by artist');

  const { data } = await getEventsByArtist(artistID, apiPage, 100);
  return data as BulkEventsResponse;
};

const useGetEventsByUser = (userID: string) => {
  if (!userID || userID.length === 0) {
    throw new Error('No user ID provided');
  }

  const [eventData, setEventData] = useState<Event[]>([]);
  const [apiPage, setApiPage] = useState<number>(1);
  const memoizedFetchEventsByArtist = useCallback(() => fetchEventsByArtist(userID, apiPage), [userID, apiPage]);

  const { data, isLoading, isError } = useQuery(['getEventsByUser', userID, apiPage], memoizedFetchEventsByArtist, {
    enabled: !!userID,
    keepPreviousData: true,
    onSuccess: (data) => {
      setEventData((prevEvents) => {
        const uniqueEvents = data.events?.filter(
          (event) => !prevEvents.some((prevEvent) => prevEvent.eventId === event.eventId),
        );
        if (!uniqueEvents) return prevEvents;
        return [...prevEvents, ...uniqueEvents];
      });
    },
  });

  return { userEventsData: eventData, numberOfEvents: data?.numberOfEvents, isLoading, isError, setApiPage };
};

export { useGetEventsByUser };
