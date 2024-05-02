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

export type { DateHighlight, UserData };
