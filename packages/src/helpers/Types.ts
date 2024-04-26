interface CalendarEvent {
  EventId: string;
  EventName: string;
  EventDescription: string;
  EventTotalSeats: number;
  EventRegisteredSeats: number;
  EventStartDate: string;
  EventEndDate: string;
  EventStatus: string;
  EventCreatedBy: string;
}

export type { CalendarEvent };
