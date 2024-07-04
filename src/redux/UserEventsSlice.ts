import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../helpers';

interface UserEventsState {
  savedEvents: Event[];
  registeredEvents: { event: Event; cancelled: boolean }[];
}

const initialState: UserEventsState = {
  savedEvents: [],
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
    setRegisteredEvents: (state, action: PayloadAction<{ event: Event; cancelled: boolean }[]>) => {
      state.registeredEvents = action.payload;
    },
    addRegisteredEvent: (state, action: PayloadAction<Event>) => {
      if (!state.registeredEvents.find((re) => re.event.eventId === action.payload.eventId)) {
        state.registeredEvents.push({ event: action.payload, cancelled: false });
      }
    },
    cancelRegisteredEvent: (state, action: PayloadAction<string>) => {
      const registeredEvent = state.registeredEvents.find((re) => re.event.eventId === action.payload);
      if (registeredEvent) {
        registeredEvent.cancelled = true;
      }
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
