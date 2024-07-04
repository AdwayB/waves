import { FC } from 'react';
import { EventCard, EventCardProps } from '../../../components';
import styles from './registeredEventsTab.module.scss';

interface RegisteredEventsTabProps {
  registeredEvents: EventCardProps[];
  handleCardClick: (eventId?: string) => void;
}

const RegisteredEventsTab: FC<RegisteredEventsTabProps> = (props) => {
  const { registeredEvents, handleCardClick } = props;

  return (
    <div className={styles.registeredEventsContainer}>
      {registeredEvents.map((data, index) => (
        <EventCard key={`${data.startDate?.format('DDMMM')}-${index}`} onClickHandler={handleCardClick} {...data} />
      ))}
    </div>
  );
};

export { RegisteredEventsTab };
export type { RegisteredEventsTabProps };
