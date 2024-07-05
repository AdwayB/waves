import { APIResponse } from '../../helpers';
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

export { getUserByID, getUserByIDList, getSavedEvents };
