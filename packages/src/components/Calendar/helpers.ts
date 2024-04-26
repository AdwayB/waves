import dayjs, { Dayjs } from 'dayjs';
import { CalendarEvent } from '../../helpers';

const getCalendarDays = (date: Dayjs) => {
  const monthStart = date.startOf('month');
  const monthEnd = date.endOf('month');
  const daysInMonth = monthEnd.date();
  const firstDayOfMonth = monthStart.day();
  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(monthStart.date(i));
  }

  return days;
};

const filterEventsByDate = (events: CalendarEvent[], date: Dayjs): CalendarEvent[] => {
  return events.filter(
    (event) => dayjs(event.EventStartDate).isSame(date, 'day') || dayjs(event.EventEndDate).isSame(date, 'day'),
  );
};

export { getCalendarDays, filterEventsByDate };
