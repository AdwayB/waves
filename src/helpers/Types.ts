import { Dayjs } from 'dayjs';
import { Discount, Event, Location } from './Responses';

interface DateHighlight {
  date: Dayjs;
  count: number;
}

interface CreateEvent {
  eventName?: string;
  eventDescription?: string;
  eventBackgroundImage?: string;
  eventTotalSeats?: number;
  eventRegisteredSeats?: number;
  eventTicketPrice?: number;
  eventGenres?: string[];
  eventCollab?: string[];
  eventStartDate?: string;
  eventEndDate?: string;
  eventLocation?: Location;
  eventStatus?: string;
  eventCreatedBy?: string;
  eventAgeRestriction?: number;
  eventCountry?: string;
  eventDiscounts?: Discount[];
}

interface UserData {
  UserId?: string;
  Username?: string;
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

interface EventRegistrations {
  cancelled: boolean;
  numberOfRegistrations: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  registeredUserIds?: string[];
}

interface BulkEventsResponse {
  numberOfEvents: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  events?: Event[];
}

interface UserFeedback {
  feedbackId?: string;
  userId?: string;
  rating?: number;
  comment?: string;
}

interface EventFeedbackResponse {
  numberOfFeedback?: number;
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
  feedbacks?: UserFeedback[];
}

interface UpdateEventRequest {
  eventId?: string;
  eventName?: string;
  eventDescription?: string;
  eventBackgroundImage?: string;
  eventTotalSeats?: number;
  eventRegisteredSeats?: number;
  eventTicketPrice?: number;
  eventGenres?: string[];
  eventCollab?: string[];
  eventStartDate?: string;
  eventEndDate?: string;
  eventLocation?: Location;
  eventStatus?: string;
  eventAgeRestriction?: number;
  eventCountry?: string;
  eventDiscounts?: Discount[];
}

interface IDList {
  id: string[];
}

type UserDetailsWithEventIdList = UserData & { eventID: string[] };

interface RegistrationRequest {
  UserId: string;
  EventId: string;
  UserEmail: string;
}

interface RegistrationResponse {
  EventId: string;
  PaymentId: string;
  InvoiceId: string;
  Amount: number;
  Status: string;
}

enum EventStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

enum UserType {
  User = 'User',
  Admin = 'Admin',
}

export { EventStatus, UserType };
export type {
  DateHighlight,
  CreateEvent,
  UserData,
  UserDataResponse,
  UserLoginRequest,
  UserSavedEvents,
  UserEventRegistrations,
  EventRegistrations,
  BulkEventsResponse,
  UserFeedback,
  EventFeedbackResponse,
  UpdateEventRequest,
  IDList,
  UserDetailsWithEventIdList,
  RegistrationRequest,
  RegistrationResponse,
};
