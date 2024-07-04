import { useDispatch } from 'react-redux';
import { getEventsByIDList, getSavedEvents, getUserRegistrations } from '../utils';
import { UserEventRegistrations, UserSavedEvents } from '../helpers/Types';
import { Event } from '../helpers/Responses';
import { setRegisteredEvents, setSavedEvents } from '../redux';

const fetchSavedEventIDs = async () => {
  console.log('fetching saved events');

  const { data } = await getSavedEvents();
  return data as UserSavedEvents;
};

const fetchRegisteredEvents = async (userID: string, apiPage: number) => {
  console.log('fetching registered events');

  const { data } = await getUserRegistrations(userID, apiPage, 100);
  return data as UserEventRegistrations;
};

const fetchEventsByIDs = async (ids: string[]) => {
  if (!ids || ids.length === 0) {
    throw new Error('No event IDs provided');
  }

  console.log('fetching events');

  const { data } = await getEventsByIDList(ids);
  return data as Event[];
};

const useUpdateUserEventsState = async (userId: string) => {
  const dispatch = useDispatch();

  if (!userId || userId.length === 0) return;

  const savedEventIDs = await fetchSavedEventIDs();

  const savedEvents = await fetchEventsByIDs(savedEventIDs.events);

  const registeredEventsResponse = await fetchRegisteredEvents(userId, 1);

  dispatch(setSavedEvents(savedEvents));
  dispatch(
    setRegisteredEvents(registeredEventsResponse.registeredEvents!.filter((e) => e !== null && e !== undefined)),
  );
};

export { useUpdateUserEventsState };
