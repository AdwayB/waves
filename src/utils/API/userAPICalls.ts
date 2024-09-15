import { AxiosError, AxiosResponse } from 'axios';
import { APIResponse, UserData, UserDetailsWithEventIdList } from '../../helpers';
import { usersAPI } from './apiObjects';

const getUserByID = async (id: string): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await usersAPI.get(`/get-user-by-id/${id}`);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const getUserByIDList = async (ids: string[]): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    const filteredIds = ids.filter((id) => id !== undefined && id !== null && id !== '');
    response = await usersAPI.post('/get-user-by-id-list', filteredIds, {
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

const getSavedEvents = async (): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await usersAPI.get('/get-saved');
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const updateUserInfo = async (data: UserData): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await usersAPI.patch('/update-user', data);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const saveEvent = async (dataWithEventIds: UserDetailsWithEventIdList): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await usersAPI.patch('/add-to-saved', dataWithEventIds);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const getProfilePhoto = async (): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await usersAPI.get('/get-profile-photo');
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const setProfilePhoto = async (profilePhotoAsString: string): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await usersAPI.post('/set-profile-photo', { profilePhotoAsString });
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const deleteProfilePhoto = async (): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await usersAPI.delete('/delete-profile-photo');
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

export {
  getUserByID,
  getUserByIDList,
  getSavedEvents,
  updateUserInfo,
  saveEvent,
  getProfilePhoto,
  setProfilePhoto,
  deleteProfilePhoto,
};
