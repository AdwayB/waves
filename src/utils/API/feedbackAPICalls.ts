import { APIResponse } from '../../helpers';
import { feedbackAPI } from './apiObjects';

const getFeedbackForEventId = async (eventID: string): Promise<APIResponse> => {
  const response = await feedbackAPI.get(`/get-feedback-by-eventId/${eventID}/1/10`);
  return { status: response.status, data: response.data };
};

const getFeedbackByEventAndUser = async (eventId: string, userId: string): Promise<APIResponse> => {
  const response = await feedbackAPI.get(`/get-feedback-by-event-and-user/${eventId}/${userId}`);
  return { status: response.status, data: response.data };
};

const getAverageRatingForEvent = async (eventId: string): Promise<APIResponse> => {
  const response = await feedbackAPI.get(`/get-average-rating/${eventId}`);
  return { status: response.status, data: response.data };
};

export { getFeedbackForEventId, getFeedbackByEventAndUser, getAverageRatingForEvent };
