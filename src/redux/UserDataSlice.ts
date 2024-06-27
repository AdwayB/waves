import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../helpers';

interface UserDataState {
  user: UserData | null;
  isAuthenticated: boolean;
}

const initialState: UserDataState = {
  user: null,
  isAuthenticated: false,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setIsAuthenticated } = userDataSlice.actions;

export default userDataSlice.reducer;
