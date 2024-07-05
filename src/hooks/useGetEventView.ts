import { useQuery } from 'react-query';
import { useCallback } from 'react';
import { Event, EventFeedbackResponse, UserDataResponse, UserFeedback } from '../helpers';
import {
  getEventById,
  getUserByID,
  getFeedbackForEventId,
  getFeedbackByEventAndUser,
  getAverageRatingForEvent,
} from '../utils';

const fetchEvent = async (id: string) => {
  if (!id || id.length === 0) {
    throw new Error('No event ID provided');
  }

  console.log('fetching event');

  const { data } = await getEventById(id);
  return data as Event;
};

const fetchUser = async (artistId: string) => {
  if (!artistId || artistId.length === 0) {
    throw new Error('No artist ID provided');
  }

  console.log('fetching user');

  const { data } = await getUserByID(artistId);
  return data as UserDataResponse;
};

const fetchEventFeedback = async (eventId: string) => {
  if (!eventId || eventId.length === 0) {
    throw new Error('Unable to fetch feedback: No event ID provided');
  }

  console.log('fetching event feedback');

  const { data } = await getFeedbackForEventId(eventId);
  const returnedData = data as EventFeedbackResponse;
  return returnedData.feedbacks as UserFeedback[];
};

const fetchAverageRating = async (eventId: string) => {
  if (!eventId || eventId.length === 0) {
    throw new Error('Unable to fetch rating: No event ID provided');
  }

  console.log('fetching average rating');

  const { data } = await getAverageRatingForEvent(eventId);
  return data as string;
};

const fetchEventFeedbackByUser = async (eventId: string, userId: string) => {
  if (!eventId || eventId.length === 0) {
    throw new Error('Unable to fetch feedback: No event ID provided');
  }

  if (!userId || userId.length === 0) {
    throw new Error('Unable to fetch feedback: No user ID provided');
  }

  console.log('fetching event feedback by user');

  const { data } = await getFeedbackByEventAndUser(eventId, userId);
  return data as UserFeedback;
};

const useGetEventView = (eventId: string, admin: boolean = false, edit: boolean = false) => {
  const memoizedFetchEvent = useCallback(() => fetchEvent(eventId), [eventId]);

  const {
    data: eventData,
    isLoading: getEventLoading,
    isError: getEventError,
  } = useQuery('getEvent', memoizedFetchEvent, {
    enabled: eventId.length > 0,
    keepPreviousData: true,
  });

  const artistId = eventData?.eventCreatedBy ?? '';

  const memoizedFetchUser = useCallback(() => fetchUser(artistId), [artistId]);
  const memoizedFetchEventFeedback = useCallback(() => fetchEventFeedback(eventData?.eventId ?? ''), [eventData]);
  const memoizedFetchAverageRating = useCallback(() => fetchAverageRating(eventData?.eventId ?? ''), [eventData]);
  const memoizedFetchEventFeedbackByUser = useCallback(
    () => fetchEventFeedbackByUser(eventData?.eventId ?? '', artistId),
    [eventData, artistId],
  );

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery(['getUsers', eventData], memoizedFetchUser, {
    enabled: !!artistId && artistId.length > 0,
    keepPreviousData: true,
  });

  const {
    data: feedbackData,
    isLoading: feedbackLoading,
    isError: feedbackError,
  } = useQuery(['getEventFeedback', eventData], memoizedFetchEventFeedback, {
    enabled: !!eventData?.eventId,
    keepPreviousData: true,
  });

  const {
    data: averageRating,
    isLoading: averageRatingLoading,
    isError: averageRatingError,
  } = useQuery(['getAverageRating', eventData], memoizedFetchAverageRating, {
    enabled: !!eventData?.eventId,
    keepPreviousData: true,
  });

  const {
    data: feedbackByUserData,
    isLoading: feedbackByUserLoading,
    isError: feedbackByUserError,
  } = useQuery(['getEventFeedbackByUser', eventData, artistId, !admin], memoizedFetchEventFeedbackByUser, {
    enabled: !!eventData?.eventId && artistId.length > 0 && !admin,
    keepPreviousData: true,
  });

  if (edit) {
    return {
      eventData,
      userData,
      averageRating,
      isLoading: getEventLoading || userLoading,
      isError: getEventError || userError,
    };
  }

  if (admin) {
    return {
      eventData,
      userData,
      feedbackData,
      averageRating,
      isLoading: getEventLoading || userLoading,
      isFeedbackLoading: feedbackLoading || averageRatingLoading,
      isError: getEventError || userError,
      isFeedbackError: feedbackError || averageRatingError,
    };
  }

  return {
    eventData,
    userData,
    feedbackData,
    averageRating,
    feedbackByUserData,
    isLoading: getEventLoading || userLoading || feedbackLoading || feedbackByUserLoading || averageRatingLoading,
    isFeedbackLoading: getEventLoading || userLoading,
    isError: getEventError || userError,
    isFeedbackError: feedbackError || feedbackByUserError || averageRatingError,
  };
};

export { useGetEventView };
