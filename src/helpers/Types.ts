import { Dayjs } from 'dayjs';

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

export type { DateHighlight, UserData, UserFeedback };
