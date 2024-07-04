import { APIResponse } from '../../helpers';
import { paymentsAPI } from './apiObjects';

const getUserRegistrations = async (userId: string, pageNumber: number, pageSize: number): Promise<APIResponse> => {
  const response = await paymentsAPI.get(`get-registrations-by-user/${userId}/${pageNumber}/${pageSize}`);
  return { status: response.status, data: response.data };
};

export { getUserRegistrations };
