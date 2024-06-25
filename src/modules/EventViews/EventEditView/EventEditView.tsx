import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, DatePicker, InputField, InputNumber, Select } from '../../../components';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './eventEditView.module.scss';
import { Event, EventStatus, EventTestData } from '../../../helpers';
import { EventBody } from '../EventBody';
import dayjs, { Dayjs } from 'dayjs';

const EventEditView: FC = () => {
  document.title = 'Edit Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventInfo, setEventInfo] = useState<Event>();
  const [editedData, setEditedData] = useState<Event | null>(null);
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [status, setStatus] = useState<string[]>();
  const eventData = EventTestData;

  useEffect(() => {
    const foundEvent = eventData.find((event) => event.EventId === eventId);
    foundEvent &&
      (setEventInfo(foundEvent),
      setEditedData(foundEvent),
      setStartDate(dayjs(foundEvent.EventStartDate)),
      setEndDate(dayjs(foundEvent.EventEndDate)),
      setStartTime(dayjs(foundEvent.EventStartDate).format('HH:mm A')),
      setEndTime(dayjs(foundEvent.EventEndDate).format('HH:mm A')),
      setStatus([foundEvent.EventStatus]));
  }, [eventData, eventId]);

  if (!eventInfo) {
    return (
      <div className={styles.eventFriendlyScreen}>
        Event not found! <Button label="Back" onClick={() => navigate(-1)} className={styles.backButton} />
      </div>
    );
  }

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setEventInfo((prev) => {
      if (!prev) return undefined;

      const newValue =
        fieldName === 'EventGenres'
          ? e.target.value.split(', ').map((word) => (word[0].toUpperCase() + word.slice(1)).replace('.', ''))
          : e.target.value;

      return { ...prev, [fieldName]: newValue };
    });
  };

  const handleDateChange = (date: Dayjs, fieldName: string) => {
    switch (fieldName) {
      case 'startDate':
        setStartDate(date);
        updateEventDateTime('EventStartDate', date, startTime);
        break;
      case 'endDate':
        setEndDate(date);
        updateEventDateTime('EventEndDate', date, endTime);
        break;
    }
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    var time = e.target.value.replace(' ', '').replace('.', '').toLowerCase();

    if (time.includes('am')) {
      time = time.replace('am', '');
    } else if (time.includes('pm')) {
      time = time.replace('pm', '');
      const [hours, minutes] = time.split(':').map(Number);
      const updatedTime = `${((hours % 12) + 12).toString()}:${minutes.toString()}`;
      time = updatedTime;
    }

    switch (fieldName) {
      case 'startTime':
        setStartTime(time);
        updateEventDateTime('EventStartDate', startDate, time);
        break;
      case 'endTime':
        setEndTime(time);
        updateEventDateTime('EventEndDate', endDate, time);
        break;
    }
  };

  const updateEventDateTime = (fieldName: string, date?: Dayjs, time?: string) => {
    if (date && time) {
      const [hours, minutes] = time.split(':').map(Number);
      const updatedDateTime = date.hour(hours).minute(minutes).second(0).millisecond(0).utc().format();
      setEventInfo((prev) => {
        if (!prev) return undefined;
        return { ...prev, [fieldName]: updatedDateTime };
      });
    }
  };

  const handleEditEvent = () => {
    console.log('Edited event');
  };

  return (
    <div className={styles.eventContainer}>
      <div className={styles.eventInfoHeader}>
        <div className={styles.eventInfoHeaderLeft}>
          <Button label="Back" onClick={() => navigate(-1)} className={styles.backButton} />
        </div>
        <span className={styles.eventTitle}>
          Edit Event - <span className={styles.eventName}>{eventInfo.EventName}</span>
        </span>
        <div className={styles.eventInfoHeaderRight}>
          <div className={styles.eventActions}>
            <Button
              label="Save Changes"
              buttontype="secondary"
              onClick={handleEditEvent}
              className={styles.saveButton}
            />
          </div>
        </div>
      </div>
      <div className={styles.eventEditBody}>
        <div className={styles.eventViewBody}>
          <EventBody eventInfo={eventInfo} />
        </div>
        <div className={styles.eventEditFields}>
          <span className={styles.eventEditFieldsTitle}>Edit Fields</span>
          <div className={styles.eventEditFieldsBody}>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit Event Name</span>
              <InputField
                type="text"
                id={'event-name'}
                value={editedData!['EventName']}
                onChange={(e) => handleTextFieldChange(e, 'EventName')}
              />
            </div>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit Event Description</span>
              <InputField
                type="text"
                id={'event-description'}
                value={editedData!['EventDescription']}
                onChange={(e) => handleTextFieldChange(e, 'EventDescription')}
              />
            </div>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit Event Genres</span>
              <span className={styles.eventEditFieldSubTitle}>Enter a list separated by commas, e.g. Rock, Pop</span>
              <InputField
                type="text"
                id={'event-genres'}
                value={editedData!['EventGenres']?.toString() ?? ''}
                onChange={(e) => handleTextFieldChange(e, 'EventGenres')}
              />
            </div>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit Total Seats for Event</span>
              <InputNumber
                id={'event-total-seats'}
                value={editedData!['EventTotalSeats'] ?? 0}
                onChange={(e) => handleTextFieldChange(e, 'EventTotalSeats')}
              />
            </div>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit Start Date</span>
              <DatePicker id={'start-date'} value={startDate} onChange={(v) => handleDateChange(v, 'startDate')} />
            </div>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit End Date</span>
              <DatePicker id={'end-date'} value={endDate} onChange={(v) => handleDateChange(v, 'endDate')} />
            </div>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit Start Time</span>
              <span className={styles.eventEditFieldSubTitle}>Enter a time in the formats: 6:00 PM or 18:00</span>
              <InputField
                type="text"
                id={'start-time'}
                value={startTime}
                onChange={(e) => handleTimeChange(e, 'startTime')}
              />
            </div>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit End Time</span>
              <span className={styles.eventEditFieldSubTitle}>Enter a time in the formats: 6:00 PM or 18:00</span>
              <InputField
                type="text"
                id={'end-time'}
                value={endTime}
                onChange={(e) => handleTimeChange(e, 'endTime')}
              />
            </div>
            <div className={styles.eventEditField}>
              <span className={styles.eventEditFieldLabel}>Edit Event Status</span>
              <div className={styles.selectWrapper}>
                <Select
                  value={status}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e: any) => setStatus(e.target.value)}
                  options={[
                    {
                      label: EventStatus.Scheduled,
                      value: EventStatus.Scheduled,
                    },
                    {
                      label: EventStatus.Completed,
                      value: EventStatus.Completed,
                    },
                    {
                      label: EventStatus.Cancelled,
                      value: EventStatus.Cancelled,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventEditView };
