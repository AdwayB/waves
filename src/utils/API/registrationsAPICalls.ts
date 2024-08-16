import { AxiosError, AxiosResponse } from 'axios';
import { APIResponse, RegistrationRequest } from '../../helpers';
import { paymentsAPI } from './apiObjects';

const getUserRegistrations = async (userId: string, pageNumber: number, pageSize: number): Promise<APIResponse> => {
  const response = await paymentsAPI.get(`/get-registrations-by-user/${userId}/${pageNumber}/${pageSize}`);
  return { status: response.status, data: response.data };
};

const getEventRegistrations = async (eventId: string, pageNumber: number, pageSize: number): Promise<APIResponse> => {
  const response = await paymentsAPI.get(`/get-registrations-for-event/${eventId}/${pageNumber}/${pageSize}`);
  return { status: response.status, data: response.data };
};

const registerForEvent = async (registrationRequest: RegistrationRequest): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await paymentsAPI.post('/register-for-event', registrationRequest);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

export { getUserRegistrations, getEventRegistrations, registerForEvent };
