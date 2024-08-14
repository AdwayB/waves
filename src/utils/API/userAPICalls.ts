import { AxiosError, AxiosResponse } from 'axios';
import { APIResponse, UserData } from '../../helpers';
import { usersAPI } from './apiObjects';

const getUserByID = async (id: string): Promise<APIResponse> => {
  const response = await usersAPI.get(`/get-user-by-id/${id}`);
  return { status: response.status, data: response.data };
};

const getUserByIDList = async (ids: string[]): Promise<APIResponse> => {
  const filteredIds = ids.filter((id) => id !== undefined && id !== null && id !== '');
  const response = await usersAPI.post('/get-user-by-id-list', filteredIds, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: response.status, data: response.data };
};

const getSavedEvents = async (): Promise<APIResponse> => {
  const response = await usersAPI.get('/get-saved');
  return { status: response.status, data: response.data };
};

const updateUserInfo = async (data: UserData): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    console.log('Updating user data: ');
    console.log(data);

    response = await usersAPI.patch('/update-user', data);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

export { getUserByID, getUserByIDList, getSavedEvents, updateUserInfo };
