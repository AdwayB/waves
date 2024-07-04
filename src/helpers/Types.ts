import { Dayjs } from 'dayjs';
import { Discount, Event } from './Responses';

interface DateHighlight {
  date: Dayjs;
  count: number;
}

interface UserData {
  UserId?: string;
  UserName?: string;
  Password?: string;
  LegalName?: string;
  Email: string;
  MobileNumber?: string;
  Country?: string;
  Type: string;
}

interface UserDataResponse {
  userId: string;
  userName?: string;
  password?: string;
  legalName?: string;
  email: string;
  mobileNumber?: string;
  country?: string;
  type: string;
}

interface UserLoginRequest {
  email: string;
  password: string;
  type: string;
}

interface UserFeedback {
  FeedbackId: string;
  UserId: string;
  Rating: number;
  Comment: string;
}

interface UserSavedEvents {
  userId: string;
  events: string[];
}

interface UserEventRegistrations {
  cancelled: boolean;
  numberOfRegistrations: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  registeredEvents?: Event[];
}

interface BulkEventsResponse {
  numberOfEvents: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  events?: Event[];
}

interface UpdateEventRequest {
  EventId?: string;
  EventName?: string;
  EventDescription?: string;
  EventBackgroundImage?: string;
  EventTotalSeats?: number;
  EventRegisteredSeats?: number;
  EventTicketPrice?: number;
  EventGenres?: string[];
  EventCollab?: string[];
  EventStartDate?: string;
  EventEndDate?: string;
  EventLocation?: Location;
  EventStatus?: string;
  EventAgeRestriction?: number;
  EventCountry?: string;
  EventDiscounts?: Discount[];
}

interface IDList {
  id: string[];
}

enum EventStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export { EventStatus };
export type {
  DateHighlight,
  UserData,
  UserDataResponse,
  UserLoginRequest,
  UserFeedback,
  UserSavedEvents,
  UserEventRegistrations,
  BulkEventsResponse,
  UpdateEventRequest,
  IDList,
};
