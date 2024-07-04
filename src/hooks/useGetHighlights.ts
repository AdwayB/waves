import { useMemo } from 'react';
import dayjs from 'dayjs';
import { DateHighlight, Event } from '../helpers';

const useGetHighlights = (events: Event[]): DateHighlight[] => {
  return useMemo(
    () =>
      events.reduce((highlights: DateHighlight[], event) => {
        if (event.eventStartDate) {
          const eventDate = dayjs(event.eventStartDate).startOf('day');
          const existingHighlight = highlights.find((h) => h.date.utc().isSame(eventDate.utc(), 'day'));
          if (existingHighlight) {
            existingHighlight.count += 1;
          } else {
            highlights.push({
              date: eventDate,
              count: 1,
            });
          }
        }
        return highlights;
      }, []),
    [events],
  );
};

export { useGetHighlights };
