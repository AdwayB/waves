import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { CalendarEvent } from '../../helpers';

interface CalendarProps {
  rootDate?: Dayjs | null;
  registeredEvents?: CalendarEvent[];
  savedEvents?: CalendarEvent[];
}

const Calendar: FC<CalendarProps> = () => {
  return <div>Calendar</div>;
};

export { Calendar };
