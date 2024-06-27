import { Dayjs } from 'dayjs';
import { Event } from './Responses';

interface DateHighlight {
  date: Dayjs;
  count: number;
}

interface UserData {
  userId?: string;
  userName: string;
  userPassword?: string;
  legalName: string;
  email: string;
  mobileNumber: string;
  countryCode?: string;
  type?: string;
}

interface UserFeedback {
  FeedbackId: string;
  UserId: string;
  Rating: number;
  Comment: string;
}

interface UserSavedEvents {
  UserId: string;
  Events: string[];
}

interface UserEventRegistrations {
  Cancelled: boolean;
  NumberOfRegistrations: number;
  TotalPages: number;
  PageNumber: number;
  PageSize: number;
  RegisteredEventIds?: Event[];
}

interface BulkEventsResponse {
  NumberOfEvents: number;
  TotalPages: number;
  PageNumber: number;
  PageSize: number;
  Events?: Event[];
}

enum EventStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export { EventStatus };
export type { DateHighlight, UserData, UserFeedback, UserSavedEvents, UserEventRegistrations, BulkEventsResponse };
