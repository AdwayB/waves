import { APIResponse, UserData, UserLoginRequest } from '../../helpers';
import { authAPI } from './apiObjects';

const signupUser = async (formData: UserData): Promise<APIResponse> => {
  const response = await authAPI.post('/signup', formData);
  return { status: response.status, data: response.data };
};

const loginUser = async (formData: UserLoginRequest): Promise<APIResponse> => {
  const response = await authAPI.post('/login', formData);
  return { status: response.status, data: response.data };
};

export { signupUser, loginUser };
