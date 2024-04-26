import { FC } from 'react';
import { Calendar } from '../../components';

const CalendarPage: FC = () => {
  return (
    <>
      <div style={{ fontSize: '50px', color: 'red' }}>Testing Calendar</div>
      <Calendar />
    </>
  );
};

export { CalendarPage };
