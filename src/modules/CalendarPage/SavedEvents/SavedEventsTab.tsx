import { FC } from 'react';
import { EventCard, EventCardProps } from '../../../components';
import styles from './savedEventsTab.module.scss';

interface SavedEventsTabProps {
  savedEvents: EventCardProps[];
}

const SavedEventsTab: FC<SavedEventsTabProps> = (props) => {
  const { savedEvents } = props;

  return (
    <div className={styles.savedEventsContainer}>
      {savedEvents.map((data, index) => (
        <EventCard key={`${data.startDate?.format('DDMMM')}-${index}`} {...data} />
      ))}
    </div>
  );
};

export { SavedEventsTab };
export type { SavedEventsTabProps };
