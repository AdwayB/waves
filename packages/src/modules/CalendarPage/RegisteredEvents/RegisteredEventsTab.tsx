import { FC, useEffect, useState } from 'react';
import { EventCard, EventCardProps } from '../../../components';
import dayjs, { Dayjs } from 'dayjs';
import { EventTestData, UserTestData, getRegisteredEventsCardData } from '../../../helpers';
import styles from './registeredEventsTab.module.scss';

interface RegisteredEventsTabProps {
  date?: Dayjs;
}

const RegisteredEventsTab: FC<RegisteredEventsTabProps> = (props) => {
  const { date } = props;
  const EventData = EventTestData;
  const UserData = UserTestData;
  const [mappedCardData, setMappedCardData] = useState<EventCardProps[]>([{}]);

  useEffect(() => {
    const usingDate = date ?? dayjs();
    const data = getRegisteredEventsCardData(EventData.slice(0, 10), UserData, usingDate);
    setMappedCardData(data);
  }, [EventData, UserData, date]);

  return (
    <div className={styles.registeredEventsContainer}>
      {mappedCardData.map((data, index) => (
        <EventCard key={`${data.startDate?.format('DDMMM')}-${index}`} {...data} />
      ))}
    </div>
  );
};

export { RegisteredEventsTab };
export type { RegisteredEventsTabProps };
