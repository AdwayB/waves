import { Dayjs } from 'dayjs';
import { Discount, Event, Location } from './Responses';

enum EventStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

enum UserType {
  User = 'User',
  Admin = 'Admin',
}

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
  userId?: string;
  userName?: string;
  password?: string;
  legalName?: string;
  email: string;
  mobileNumber?: string;
  country?: string;
  type: string;
}

interface LoginResponse {
  user: UserData;
  token: string;
}

const UserDataInit: UserData = {
  userName: '',
  legalName: '',
  email: '',
  password: '',
  mobileNumber: '',
  type: UserType.User,
};

const UserLoginInit: UserLoginRequest = {
  email: '',
  password: '',
  type: UserType.User,
};

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

export { UserDataInit, UserLoginInit, EventStatus, UserType };
export type {
  DateHighlight,
  CreateEvent,
  UserData,
  LoginResponse,
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
