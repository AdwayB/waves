import { FC, useEffect, useState } from 'react';
import { EventCard, EventCardProps } from '../../../components';
import dayjs, { Dayjs } from 'dayjs';
import { EventTestData, UserTestData, getSavedEventsCardData } from '../../../helpers';
import styles from './savedEventsTab.module.scss';

interface SavedEventsTabProps {
  date?: Dayjs;
}

const SavedEventsTab: FC<SavedEventsTabProps> = (props) => {
  const { date } = props;
  const EventData = EventTestData;
  const UserData = UserTestData;
  const [mappedCardData, setMappedCardData] = useState<EventCardProps[]>([{}]);

  useEffect(() => {
    const usingDate = date ?? dayjs();
    const data = getSavedEventsCardData(EventData.slice(10), UserData, usingDate);
    setMappedCardData(data);
  }, [EventData, UserData, date]);

  return (
    <div className={styles.savedEventsContainer}>
      {mappedCardData.map((data, index) => (
        <EventCard key={`${data.startDate?.format('DDMMM')}-${index}`} {...data} />
      ))}
    </div>
  );
};

export { SavedEventsTab };
export type { SavedEventsTabProps };
