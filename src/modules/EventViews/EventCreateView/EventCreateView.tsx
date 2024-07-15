import { ChangeEvent, FC, useState } from 'react';
import styles from './eventCreateView.module.scss';
import { Dayjs } from 'dayjs';
import { CreateEvent, EventStatus } from '../../../helpers';
import { Alert, Button, DatePicker, InputField, InputNumber, Select } from '../../../components';
import { useNavigate } from 'react-router-dom';

const EventCreateView: FC = () => {
  document.title = 'Create Event - Waves';
  const navigate = useNavigate();
  const [eventInfo, setEventInfo] = useState<CreateEvent>({
    eventName: '',
    eventDescription: '',
    eventBackgroundImage: '',
    eventTotalSeats: 0,
    eventRegisteredSeats: 0,
    eventTicketPrice: 0,
    eventGenres: [],
    eventCollab: [],
    eventStartDate: '',
    eventEndDate: '',
    eventLocation: { Type: 'Point', Coordinates: [] },
    eventStatus: EventStatus.Scheduled,
    eventCreatedBy: '',
    eventAgeRestriction: 0,
    eventCountry: '',
    eventDiscounts: [],
  });
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [status, setStatus] = useState<string[]>();
  const [eventError, setEventError] = useState<boolean>(false);
  const [startTimeError, setStartTimeError] = useState<boolean>(false);
  const [endTimeError, setEndTimeError] = useState<boolean>(false);

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setEventInfo((prev) => {
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

    if (!time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](am|pm|)$/)) {
      switch (fieldName) {
        case 'startTime':
          setStartTimeError(true);
          break;
        case 'endTime':
          setEndTimeError(true);
          break;
      }
      return;
    }

    if (time.includes('am')) {
      if (time.includes('12')) {
        time = time.replace('12', '00');
      }
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
        return { ...prev, [fieldName]: updatedDateTime };
      });
    }
  };

  const handleCreateEvent = () => {
    console.log('Create event: ', eventInfo?.eventName);
  };

  return (
    <div className={styles.eventContainer}>
      <Alert visible={eventError} severity="error" onClose={() => setEventError(false)}>
        An error occurred when creating event, please try again later.
      </Alert>
      <div className={styles.eventInfoHeader}>
        <div className={styles.eventInfoHeaderLeft}>
          <Button label="Back" onClick={() => navigate(-1)} className={styles.backButton} />
        </div>
        <span className={styles.eventTitle}>Create New Event</span>
        <div className={styles.eventInfoHeaderRight}>
          <div className={styles.eventActions}>
            <Button label="Create" buttontype="secondary" onClick={handleCreateEvent} className={styles.createButton} />
          </div>
        </div>
      </div>
      <div className={styles.eventCreateFields}>
        <span className={styles.eventCreateFieldsTitle}>Edit Fields</span>
        <div className={styles.eventCreateFieldsBody}>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit Event Name</span>
            <InputField
              type="text"
              id={'event-name'}
              value={eventInfo!['eventName'] ?? 'No-Name Event'}
              onChange={(e) => handleTextFieldChange(e, 'eventName')}
            />
          </div>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit Event Description</span>
            <InputField
              type="text"
              id={'event-description'}
              value={eventInfo!['eventDescription'] ?? ''}
              onChange={(e) => handleTextFieldChange(e, 'eventDescription')}
            />
          </div>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit Event Genres</span>
            <span className={styles.eventCreateFieldSubTitle}>Enter a list separated by commas, e.g. Rock, Pop</span>
            <InputField
              type="text"
              id={'event-genres'}
              value={eventInfo!['eventGenres']?.toString() ?? ''}
              onChange={(e) => handleTextFieldChange(e, 'eventGenres')}
            />
          </div>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit Total Seats for Event</span>
            <InputNumber
              id={'event-total-seats'}
              value={eventInfo!['eventTotalSeats'] ?? 0}
              onChange={(e) => handleTextFieldChange(e, 'eventTotalSeats')}
            />
          </div>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit Start Date</span>
            <DatePicker id={'start-date'} value={startDate} onChange={(v) => handleDateChange(v, 'startDate')} />
          </div>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit End Date</span>
            <DatePicker id={'end-date'} value={endDate} onChange={(v) => handleDateChange(v, 'endDate')} />
          </div>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit Start Time</span>
            <span className={styles.eventCreateFieldSubTitle}>Enter a time in the formats: 6:00 PM or 18:00</span>
            <InputField
              type="text"
              id={'start-time'}
              value={startTime}
              onChange={(e) => handleTimeChange(e, 'startTime')}
              helperText="Enter a valid time."
              error={startTimeError}
            />
          </div>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit End Time</span>
            <span className={styles.eventCreateFieldSubTitle}>Enter a time in the formats: 6:00 PM or 18:00</span>
            <InputField
              type="text"
              id={'end-time'}
              value={endTime}
              onChange={(e) => handleTimeChange(e, 'endTime')}
              helperText="Enter a valid time."
              error={endTimeError}
            />
          </div>
          <div className={styles.eventCreateField}>
            <span className={styles.eventCreateFieldLabel}>Edit Event Status</span>
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
  );
};
export { EventCreateView };
