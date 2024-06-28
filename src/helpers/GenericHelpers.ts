import dayjs, { Dayjs } from 'dayjs';
import { CardProps, EventCardProps } from '../components';
import { User, Event } from './Responses';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Method = (...args: any[]) => void;

const throttle = (method: Method, delay: number): Method => {
  let x = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]): void => {
    const now = Date.now();
    if (now - x >= delay) {
      method(...args);
      x = now;
    }
  };
};

const calculateDistance = (coords1: [number, number], coords2: [number, number]): number => {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 6371;

  const latDist = (lat2 - lat1) * (Math.PI / 180);
  const lonDist = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(latDist / 2) * Math.sin(latDist / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(lonDist / 2) * Math.sin(lonDist / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getCardData = (eventData: Event[], userData: User[]): CardProps[] => {
  return eventData.map((event) => {
    const artistInfo = userData.find((user) => user.UserId === event.eventCreatedBy);
    return {
      eventId: event.eventId,
      title: event.eventName,
      artist: artistInfo?.LegalName || 'Unknown Artist',
      genres: event.eventGenres?.join(', '),
      rating: Math.floor(Math.random() * 5) + 1,
      startDate: dayjs(event.eventStartDate),
    };
  });
};

const getRegisteredEventsCardData = (eventData: Event[], userData: User[], date: Dayjs = dayjs()): EventCardProps[] => {
  const filteredEvents = eventData.filter((event) => dayjs(event.eventStartDate).isSame(date.utc(), 'day'));

  if (filteredEvents.length === 0) {
    return [];
  }

  return filteredEvents
    .sort((a, b) => (dayjs(a.eventStartDate).isBefore(b.eventStartDate) ? -1 : 1))
    .map((event) => {
      const artistInfo = userData.find((user) => user.UserId === event.eventCreatedBy);
      return {
        eventId: event.eventId,
        title: event.eventName,
        artist: artistInfo?.LegalName || 'Unknown Artist',
        startDate: dayjs(event.eventStartDate),
        endDate: dayjs(event.eventEndDate),
        type: 'primary',
      };
    });
};

const getSavedEventsCardData = (eventData: Event[], userData: User[], date: Dayjs = dayjs()): EventCardProps[] => {
  const filteredEvents = eventData.filter((event) => dayjs(event.eventStartDate).isSame(date.utc(), 'day'));

  if (filteredEvents.length === 0) {
    return [];
  }

  return filteredEvents
    .sort((a, b) => (dayjs(a.eventStartDate).isBefore(b.eventStartDate) ? -1 : 1))
    .map((event) => {
      const artistInfo = userData.find((user) => user.UserId === event.eventCreatedBy);
      return {
        eventId: event.eventId,
        title: event.eventName,
        artist: artistInfo?.LegalName || 'Unknown Artist',
        startDate: dayjs(event.eventStartDate),
        endDate: dayjs(event.eventEndDate),
        type: 'secondary',
      };
    });
};

export { throttle, calculateDistance, getCardData, getRegisteredEventsCardData, getSavedEventsCardData };
export type { Method };
