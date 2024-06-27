import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserDataSlice';
import userEventsReducer from './UserEventsSlice';
import adminEventsReducer from './AdminEventsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    userEvents: userEventsReducer,
    adminEvents: adminEventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export { store };
