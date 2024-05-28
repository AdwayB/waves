import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Event } from '../../../../helpers';
import styles from './eventEditFields.module.scss';
import { DatePicker, InputField, InputNumber } from '../../../../components';
import { Dayjs } from 'dayjs';

interface EventEditFieldsProps {
  editList: string[];
  eventData: Event;
  setEventData: (e: Event) => void;
}

const EventEditFields: FC<EventEditFieldsProps> = (props) => {
  const { editList, eventData, setEventData } = props;
  const [eventInfo, setEventInfo] = useState<Event>(eventData);
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const getFieldName = (fieldName: string) =>
    fieldName
      .split('Event')[1]
      .split(/(?=[A-Z])/)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');

  useEffect(() => {
    setEventData(eventInfo);
  }, [eventInfo, setEventData]);

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (fieldName === 'EventGenres' || fieldName === 'EventCollab') {
      setEventInfo((prev) => ({
        ...prev,
        [fieldName]: e.target.value.split(', ').map((word) => (word[0].toUpperCase() + word.slice(1)).replace('.', '')),
      }));
    } else {
      setEventInfo((prev) => ({ ...prev, [fieldName]: e.target.value }));
    }
  };

  const handleDateChange = (date: Dayjs, fieldName: string) => {
    switch (fieldName) {
      case 'startDate':
        setStartDate(date);
        updateEventDateTime('EventStartDate', date, startTime);
      case 'endDate':
        setEndDate(date);
        updateEventDateTime('EventEndDate', date, endTime);
    }
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    var time = e.target.value.replace(' ', '').replace('.', '').toLowerCase();

    if (time.includes('am')) {
      time.replace('am', '');
    } else if (time.includes('pm')) {
      time.replace('pm', '');
      const [hours, minutes] = time.split(':').map(Number);
      const updatedTime = `${((hours % 12) + 12).toString()}:${minutes.toString()}`;
      time = updatedTime;
    }

    switch (fieldName) {
      case 'startTime':
        setStartTime(e.target.value);
        updateEventDateTime('EventStartDate', startDate, e.target.value);
      case 'endTime':
        setEndTime(e.target.value);
        updateEventDateTime('EventEndDate', endDate, e.target.value);
    }
  };

  const updateEventDateTime = (fieldName: string, date?: Dayjs, time?: string) => {
    if (date && time) {
      const [hours, minutes] = time.split(':').map(Number);
      const updatedDateTime = date.hour(hours).minute(minutes).second(0).millisecond(0).utc().format();
      setEventInfo((prev) => ({ ...prev, [fieldName]: updatedDateTime }));
    }
  };

  return (
    <div className={styles.eventEditFieldsContainer}>
      {editList.map((fieldName) => {
        if (eventInfo && fieldName in eventInfo) {
          const title = getFieldName(fieldName);
          switch (fieldName) {
            case 'EventName':
            case 'EventDescription':
              return (
                <div key={fieldName} className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>{title}</span>
                  <InputField
                    type="text"
                    id={fieldName}
                    value={eventInfo[fieldName]}
                    onChange={(e) => handleTextFieldChange(e, fieldName)}
                  />
                </div>
              );

            case 'EventGenres':
            case 'EventCollab':
              return (
                <div key={fieldName} className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>{title}</span>
                  <span className={styles.eventEditFieldSubTitle}>
                    Enter a list separated by commas, e.g. Rock, Pop
                  </span>
                  <InputField
                    type="text"
                    id={fieldName}
                    value={eventInfo[fieldName]?.toString() ?? ''}
                    onChange={(e) => handleTextFieldChange(e, fieldName)}
                  />
                </div>
              );

            case 'EventTotalSeats':
              return (
                <div key={fieldName} className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>{title}</span>
                  <InputNumber
                    id={fieldName}
                    value={eventInfo[fieldName]}
                    onChange={(e) => handleTextFieldChange(e, fieldName)}
                  />
                </div>
              );

            case 'startDate':
            case 'endDate':
              return (
                <div className={styles.eventEditField} key={fieldName}>
                  <span className={styles.eventEditFieldLabel}>
                    {fieldName === 'startDate' ? 'Start Date' : 'End Date'}
                  </span>
                  <DatePicker
                    id={fieldName}
                    value={fieldName === 'startDate' ? startDate : endDate}
                    onChange={(v) => handleDateChange(v, fieldName)}
                  />
                </div>
              );

            case 'startTime':
            case 'endTime':
              return (
                <div className={styles.eventEditField} key={fieldName}>
                  <span className={styles.eventEditFieldLabel}>
                    {fieldName === 'startTime' ? 'Start Time' : 'End Time'}
                  </span>
                  <InputField
                    type="text"
                    id={fieldName}
                    value={fieldName === 'startTime' ? startTime : endTime}
                    onChange={(e) => handleTimeChange(e, fieldName)}
                  />
                </div>
              );

            default:
              return null;
          }
        }
      })}
    </div>
  );
};

export { EventEditFields };
export type { EventEditFieldsProps };
