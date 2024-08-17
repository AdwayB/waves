import { AxiosError, AxiosResponse } from 'axios';
import { APIResponse, UserData, UserLoginRequest } from '../../helpers';
import { authAPI } from './apiObjects';

const signupUser = async (formData: UserData): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await authAPI.post('/signup', formData);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const loginUser = async (formData: UserLoginRequest): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await authAPI.post('/login', formData);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

const logoutUser = async (formData: UserLoginRequest): Promise<APIResponse> => {
  let response: AxiosResponse;
  try {
    response = await authAPI.post('/logout', formData);
  } catch (error: unknown) {
    const requestError: AxiosError = error as AxiosError;
    return { status: requestError.response?.status ?? 500, data: requestError.response?.data };
  }
  return { status: response.status, data: response.data };
};

export { signupUser, loginUser, logoutUser };
