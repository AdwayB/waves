import { RootState } from '../store';

export const selectSavedEvents = (state: RootState) => state.userEvents.savedEvents;
export const selectRegisteredEvents = (state: RootState) => state.userEvents.registeredEvents;
export const selectTotalUpcomingRegistrations = (state: RootState) => state.userEvents.numberOfUpcomingRegisteredEvents;
