import { AxiosError, AxiosResponse } from 'axios';
import { APIResponse, Event, UpdateEventRequest } from '../../helpers';
import { eventsAPI } from './apiObjects';

const getEventById = async (eventId: string): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await eventsAPI.get(`/get-event-by-id/${eventId}`);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const getBulkEvents = async (pageNumber: number, pageSize: number): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await eventsAPI.get(`/get-all-events/${pageNumber}/${pageSize}`);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const getEventsByArtist = async (artistId: string, pageNumber: number, pageSize: number): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await eventsAPI.get(`/get-events-by-artist/${artistId}/${pageNumber}/${pageSize}`);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const getEventsByIDList = async (ids: string[]): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    const filteredIds = ids.filter((id) => id !== undefined && id !== null && id !== '');
    response = await eventsAPI.post('/get-event-by-id-list', filteredIds, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const createEvent = async (eventData: Event): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await eventsAPI.post('/create-event', eventData);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const updateEvent = async (eventData: UpdateEventRequest): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await eventsAPI.patch('/update-event', eventData);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const deleteEvent = async (eventId: string): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await eventsAPI.delete(`/delete-event/${eventId}`);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

export { getEventById, getBulkEvents, getEventsByArtist, getEventsByIDList, createEvent, updateEvent, deleteEvent };
