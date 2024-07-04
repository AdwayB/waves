import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../helpers';
import dayjs from 'dayjs';

interface UserEventsState {
  savedEvents: Event[];
  numberOfUpcomingRegisteredEvents: number;
  registeredEvents: Event[];
}

const initialState: UserEventsState = {
  savedEvents: [],
  numberOfUpcomingRegisteredEvents: 0,
  registeredEvents: [],
};

const userEventsSlice = createSlice({
  name: 'userEvents',
  initialState,
  reducers: {
    setSavedEvents: (state, action: PayloadAction<Event[]>) => {
      state.savedEvents = action.payload;
    },
    addSavedEvent: (state, action: PayloadAction<Event>) => {
      if (!state.savedEvents.includes(action.payload)) {
        state.savedEvents.push(action.payload);
      }
    },
    removeSavedEvent: (state, action: PayloadAction<string>) => {
      state.savedEvents = state.savedEvents.filter((eventId) => eventId !== action.payload);
    },
    setRegisteredEvents: (state, action: PayloadAction<Event[]>) => {
      state.registeredEvents = action.payload;
      state.numberOfUpcomingRegisteredEvents = action.payload.filter((re) =>
        dayjs(re.eventEndDate).utc().isAfter(dayjs().utc(), 'day'),
      ).length;
    },
    addRegisteredEvent: (state, action: PayloadAction<Event>) => {
      if (!state.registeredEvents.find((re) => re.eventId === action.payload.eventId)) {
        state.registeredEvents.push(action.payload);
        state.numberOfUpcomingRegisteredEvents++;
      }
    },
    cancelRegisteredEvent: (state, action: PayloadAction<string>) => {
      state.registeredEvents = state.registeredEvents.filter((re) => re.eventId !== action.payload);
      state.numberOfUpcomingRegisteredEvents--;
    },
  },
});

export const {
  setSavedEvents,
  addSavedEvent,
  removeSavedEvent,
  setRegisteredEvents,
  addRegisteredEvent,
  cancelRegisteredEvent,
} = userEventsSlice.actions;
export default userEventsSlice.reducer;
