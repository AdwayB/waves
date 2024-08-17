import { AxiosError, AxiosResponse } from 'axios';
import { APIResponse } from '../../helpers';
import { feedbackAPI } from './apiObjects';

const getFeedbackForEventId = async (eventID: string): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await feedbackAPI.get(`/get-feedback-by-eventId/${eventID}/1/10`);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const getFeedbackByEventAndUser = async (eventId: string, userId: string): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await feedbackAPI.get(`/get-feedback-by-event-and-user/${eventId}/${userId}`);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const getAverageRatingForEvent = async (eventId: string): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await feedbackAPI.get(`/get-average-rating/${eventId}`);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

export { getFeedbackForEventId, getFeedbackByEventAndUser, getAverageRatingForEvent };
