import { Dayjs } from 'dayjs';
import { Event } from './Responses';

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
export type {
  DateHighlight,
  UserData,
  UserLoginRequest,
  UserFeedback,
  UserSavedEvents,
  UserEventRegistrations,
  BulkEventsResponse,
};
