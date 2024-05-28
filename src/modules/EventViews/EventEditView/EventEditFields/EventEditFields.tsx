/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { FC, useEffect, useState } from 'react';
import { Event } from '../../../../helpers';
import styles from './eventEditFields.module.scss';
import { InputField } from '../../../../components';

interface EventEditFieldsProps {
  editList: string[];
  eventData?: Event;
  setEventData: (e?: Event) => void;
}

const EventEditFields: FC<EventEditFieldsProps> = (props) => {
  const { editList, eventData, setEventData } = props;
  const [eventInfo, setEventInfo] = useState<Event | undefined>(eventData);

  enum fieldTypeMap {
    name = 'text',
    description = 'text',
    totalSeats = 'date',
    genres = 'date',
    collaborators = 'text',
    startDate = 'date',
    startTime = 'text',
    endDate = 'date',
    endTime = 'text',
    location = 'text',
    status = 'status',
  }

  const getFieldName = (fieldName: string) => {
    return fieldName
      .split(/(?=[A-Z])/)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    setEventData(eventInfo);
  }, [eventInfo, setEventData]);

  return (
    <div className={styles.eventEditFieldsContainer}>
      {editList.map((fieldName) => {
        if (eventInfo && fieldName in eventInfo) {
          const title = getFieldName(fieldName);
          switch (fieldTypeMap[fieldName as keyof typeof fieldTypeMap]) {
            case 'text':
              return (
                <div key={fieldName} className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>{title}</span>
                  <InputField
                    type="text"
                    id={fieldName}
                    value={fieldName}
                    onChange={(e) => {
                      setEventInfo({ ...eventInfo, [fieldName]: e.target.value });
                    }}
                  />
                </div>
              );
          }
        }
      })}
    </div>
  );
};

export { EventEditFields };
export type { EventEditFieldsProps };
