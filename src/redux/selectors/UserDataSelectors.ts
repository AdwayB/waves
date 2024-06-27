import { RootState } from '../store';

export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectCurrentUserType = (state: RootState) => state.user.user?.Type;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
