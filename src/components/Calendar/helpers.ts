import { Dayjs } from 'dayjs';

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

export { getCalendarDays };
