import { APIResponse, Event, UpdateEventRequest } from '../../helpers';
import { eventsAPI } from './apiObjects';

const getBulkEvents = async (pageNumber: number, pageSize: number): Promise<APIResponse> => {
  const response = await eventsAPI.get(`/get-all-events/${pageNumber}/${pageSize}`);
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

export { getBulkEvents, addEvent, updateEvent, deleteEvent };
