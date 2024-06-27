import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BulkEventsResponse, Event } from '../helpers';

interface AdminEventsState {
  numberOfEvents: number;
  events: Event[];
}

const initialState: AdminEventsState = {
  numberOfEvents: 0,
  events: [],
};

const adminEventsSlice = createSlice({
  name: 'adminEvents',
  initialState,
  reducers: {
    setAdminEvents: (state, action: PayloadAction<BulkEventsResponse>) => {
      state.numberOfEvents = action.payload.NumberOfEvents;
      state.events = action.payload.Events || [];
    },
    addAdminEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateAdminEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex((event) => event.EventId === action.payload.EventId);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    removeAdminEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.EventId !== action.payload);
    },
  },
});

export const { setAdminEvents, addAdminEvent, updateAdminEvent, removeAdminEvent } = adminEventsSlice.actions;
export default adminEventsSlice.reducer;
