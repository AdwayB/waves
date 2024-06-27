import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../helpers';

interface UserDataState {
  user: User;
  token: string;
}

const initialState: UserDataState = {
  user: {
    UserId: '',
    Username: '',
    Password: '',
    LegalName: '',
    Email: '',
    MobileNumber: '',
    Country: '',
    Type: '',
  },
  token: '',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userDataSlice.actions;
export default userDataSlice.reducer;
