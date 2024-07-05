import { APIResponse, Event, UpdateEventRequest } from '../../helpers';
import { eventsAPI } from './apiObjects';

const getEventById = async (eventId: string): Promise<APIResponse> => {
  const response = await eventsAPI.get(`/get-event-by-id/${eventId}`);
  return { status: response.status, data: response.data };
};

const getBulkEvents = async (pageNumber: number, pageSize: number): Promise<APIResponse> => {
  const response = await eventsAPI.get(`/get-all-events/${pageNumber}/${pageSize}`);
  return { status: response.status, data: response.data };
};

const getEventsByIDList = async (ids: string[]): Promise<APIResponse> => {
  const filteredIds = ids.filter((id) => id !== undefined && id !== null && id !== '');
  const response = await eventsAPI.post('/get-event-by-id-list', filteredIds, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const addEvent = async (eventData: Event): Promise<APIResponse> => {
  const response = await eventsAPI.post('/create-event', eventData);
  return { status: response.status, data: response.data };
};

const updateEvent = async (eventData: UpdateEventRequest): Promise<APIResponse> => {
  const response = await eventsAPI.patch('/update-event', eventData);
  return { status: response.status, data: response.data };
};

const deleteEvent = async (eventId: number): Promise<APIResponse> => {
  const response = await eventsAPI.delete(`/delete-event/${eventId}`);
  return { status: response.status, data: response.data };
};

export { getEventById, getBulkEvents, getEventsByIDList, addEvent, updateEvent, deleteEvent };
