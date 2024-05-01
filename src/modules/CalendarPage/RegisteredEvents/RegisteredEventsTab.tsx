import { FC } from 'react';
import { EventCard, EventCardProps } from '../../../components';
import styles from './registeredEventsTab.module.scss';

interface RegisteredEventsTabProps {
  registeredEvents: EventCardProps[];
}

const RegisteredEventsTab: FC<RegisteredEventsTabProps> = (props) => {
  const { registeredEvents } = props;

  return (
    <div className={styles.registeredEventsContainer}>
      {registeredEvents.map((data, index) => (
        <EventCard key={`${data.startDate?.format('DDMMM')}-${index}`} {...data} />
      ))}
    </div>
  );
};

export { RegisteredEventsTab };
export type { RegisteredEventsTabProps };
