import { ChangeEvent, FC, useState } from 'react';
import { Alert, Button, DatePicker, InputField, InputNumber, TimeField } from '../../../components';
import { useNavigate } from 'react-router-dom';
import styles from './eventCreateView.module.scss';
import { CreateEvent, Event, EventStatus } from '../../../helpers';
import { EventBody } from '../EventBody';
import dayjs, { Dayjs } from 'dayjs';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux';
import { createEvent } from '../../../utils';
import { BulkUploadModal } from './EventsBulkUpload/BulkUploadModal';

const sendCreateEvent = async (eventData: Event) => {
  const response = await createEvent(eventData);
  return response.status;
};

const EventCreateView: FC = () => {
  document.title = 'Create Event - Waves';
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [eventInfo, setEventInfo] = useState<CreateEvent>({
    eventName: '',
    eventDescription: '',
    eventBackgroundImage: ' ',
    eventTotalSeats: 0,
    eventRegisteredSeats: 0,
    eventTicketPrice: 0,
    eventGenres: [],
    eventCollab: [],
    eventStartDate: '',
    eventEndDate: '',
    eventLocation: { Type: 'Point', Coordinates: [78.486671, 17.385044] },
    eventStatus: EventStatus.Scheduled,
    eventCreatedBy: currentUser?.userId || '',
    eventAgeRestriction: 0,
    eventCountry: 'IND',
    eventDiscounts: [],
  });
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().local());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().local().add(1, 'day'));
  const [startTime, setStartTime] = useState<Dayjs>(dayjs().local());
  const [endTime, setEndTime] = useState<Dayjs>(dayjs().local().add(1, 'hour'));
  const [startTimeError, setStartTimeError] = useState<string | null>();
  const [endTimeError, setEndTimeError] = useState<string | null>();
  const [eventError, setEventError] = useState<boolean>(false);
  const [eventCreateError, setEventCreateError] = useState<boolean>(false);
  const [eventCreateSuccess, setEventCreateSuccess] = useState<boolean>(false);
  const [formDataError, setFormDataError] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);

  if (!eventInfo) {
    return (
      <div className={styles.eventFriendlyScreen}>
        Event not found! <Button label="Back" onClick={() => navigate(-1)} className={styles.backButton} />
      </div>
    );
  }

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setEventInfo((prev) => {
      const newValue =
        fieldName === 'eventGenres'
          ? e.target.value
              .replace(' ', '')
              .split(',')
              ?.map((word) => (!!word ? word[0].toUpperCase() + word.slice(1) : '').replace('.', ''))
          : e.target.value;

      return { ...prev, [fieldName]: newValue };
    });
  };

  const handleDateChange = (date: Dayjs, fieldName: string) => {
    switch (fieldName) {
      case 'startDate':
        setStartDate(date);
        updateEventDateTime('eventStartDate', date, startTime);
        break;
      case 'endDate':
        setEndDate(date);
        updateEventDateTime('eventEndDate', date, endTime);
        break;
    }
  };

  const handleTimeChange = (time: Dayjs | null, fieldName: string) => {
    const sanitisedTime = time ?? dayjs().local();
    switch (fieldName) {
      case 'startDate':
        setStartTime(sanitisedTime);
        updateEventDateTime('eventStartDate', startDate, sanitisedTime);
        break;
      case 'endDate':
        setEndTime(sanitisedTime);
        updateEventDateTime('eventEndDate', endDate, sanitisedTime);
        break;
    }
  };

  const updateEventDateTime = (fieldName: string, date?: Dayjs, time?: Dayjs) => {
    if (date && time) {
      const updatedDateTime = date.hour(time.hour()).minute(time.minute()).second(0).millisecond(0).utc().format();
      setEventInfo((prev) => {
        return { ...prev, [fieldName]: updatedDateTime };
      });
    }
  };

  const validateFormData = () => {
    let isValid = true;
    if (
      (eventInfo.eventStartDate &&
        eventInfo.eventEndDate &&
        dayjs(eventInfo.eventStartDate).utc().isAfter(dayjs(eventInfo.eventEndDate), 'hour')) ||
      startTimeError ||
      endTimeError
    ) {
      isValid = false;
    }
    if (
      eventInfo.eventTotalSeats &&
      eventInfo.eventRegisteredSeats &&
      eventInfo.eventTotalSeats < eventInfo.eventRegisteredSeats
    ) {
      isValid = false;
    }
    if (eventInfo.eventStatus === EventStatus.Scheduled && dayjs().local().isAfter(eventInfo?.eventEndDate, 'hour')) {
      isValid = false;
    }
    if (eventInfo?.eventName?.length === 0) {
      isValid = false;
    }
    return isValid;
  };

  const handleCreateEvent = async () => {
    if (!validateFormData()) {
      setFormDataError(true);
      return;
    }
    setCreateLoading(true);
    const responseStatus = await sendCreateEvent(eventInfo);
    if (responseStatus !== 200) {
      setEventCreateError(true);
    }
    setCreateLoading(false);
    setEventCreateSuccess(true);
  };

  return (
    <div className={styles.eventContainer}>
      <Alert visible={eventError} severity="error" onClose={() => setEventError(false)}>
        An error occurred when fetching event data, please try again later.
      </Alert>
      <Alert visible={eventCreateError} severity="error" onClose={() => setEventCreateError(false)}>
        An error occurred when creating event, please try again later.
      </Alert>
      <Alert
        visible={eventCreateSuccess}
        severity="success"
        onClose={() => {
          setEventCreateSuccess(false);
          navigate('/user/');
        }}
      >
        Successfully created event!
      </Alert>
      <Alert visible={formDataError} severity="error" onClose={() => setFormDataError(false)}>
        Invalid Data! Please verify your inputs and try again.
      </Alert>
      <div className={styles.eventInfoHeader}>
        <div className={styles.eventInfoHeaderLeft}>
          <Button label="Back" onClick={() => navigate(-1)} className={styles.backButton} />
        </div>
        <div className={styles.eventInfoHeaderCenter}>
          <span className={styles.eventTitle}>Create Event</span>
          <span className={styles.eventSubTitle}>See how your event will appear to users.</span>
        </div>
        <div className={styles.eventInfoHeaderRight}>
          <Button label="Upload Bulk Data" onClick={() => setShowBulkModal(true)} className={styles.uploadBulkButton} />
        </div>
      </div>
      <div className={styles.eventCreateBody}>
        <div className={styles.eventViewBody}>
          <EventBody eventInfo={eventInfo} rating={'0'} userInfo={currentUser!} />
          <div className={styles.eventActions}>
            <Button
              label="Create Event"
              buttontype="secondary"
              onClick={handleCreateEvent}
              className={styles.createButton}
              disabled={eventCreateError}
              buttonloading={createLoading}
            />
          </div>
        </div>
        <div className={styles.eventCreateFields}>
          <span className={styles.eventCreateFieldsTitle}>Event Fields</span>
          <div className={styles.eventCreateFieldsBody}>
            <div className={styles.eventCreateField}>
              <span className={styles.eventCreateFieldLabel}>Enter Event Name</span>
              <InputField
                type="text"
                id={'event-name'}
                value={eventInfo!['eventName'] ?? 'No-Name Event'}
                onChange={(e) => handleTextFieldChange(e, 'eventName')}
              />
            </div>
            <div className={styles.eventCreateField}>
              <span className={styles.eventCreateFieldLabel}>Enter Event Description</span>
              <InputField
                type="text"
                id={'event-description'}
                value={eventInfo!['eventDescription'] ?? ''}
                onChange={(e) => handleTextFieldChange(e, 'eventDescription')}
              />
            </div>
            <div className={styles.eventCreateField}>
              <span className={styles.eventCreateFieldLabel}>Enter Event Genres</span>
              <span className={styles.eventCreateFieldSubTitle}>Enter a list separated by commas, e.g. Rock, Pop</span>
              <InputField
                type="text"
                id={'event-genres'}
                value={eventInfo!['eventGenres']?.toString() ?? ''}
                onChange={(e) => handleTextFieldChange(e, 'eventGenres')}
              />
            </div>
            <div className={styles.eventCreateField}>
              <span className={styles.eventCreateFieldLabel}>Enter Total Seats for Event</span>
              <InputNumber
                id={'event-total-seats'}
                value={eventInfo!['eventTotalSeats'] ?? 0}
                onChange={(e) => handleTextFieldChange(e, 'eventTotalSeats')}
              />
            </div>
            <div className={styles.eventCreateField}>
              <span className={styles.eventCreateFieldLabel}>Enter Start Date</span>
              <DatePicker id={'start-date'} value={startDate} onChange={(v) => handleDateChange(v, 'startDate')} />
            </div>
            <div className={styles.eventCreateField}>
              <span className={styles.eventCreateFieldLabel}>Enter End Date</span>
              <DatePicker id={'end-date'} value={endDate} onChange={(v) => handleDateChange(v, 'endDate')} />
            </div>
            <div className={styles.eventCreateField}>
              <span className={styles.eventCreateFieldLabel}>Enter Start Time</span>
              <span className={styles.eventCreateFieldSubTitle}>Enter a time in the 24H format, eg: 18:00</span>
              <TimeField
                id={'start-time'}
                value={startTime}
                onChange={(v) => handleTimeChange(v, 'startDate')}
                onError={(error) => setStartTimeError(error)}
                slotProps={{
                  textField: {
                    helperText: startTimeError && 'Please enter a valid time.',
                  },
                }}
              />
            </div>
            <div className={styles.eventCreateField}>
              <span className={styles.eventCreateFieldLabel}>Enter End Time</span>
              <span className={styles.eventCreateFieldSubTitle}>Enter a time in the 24H format, eg: 18:00</span>
              <TimeField
                id={'end-time'}
                value={endTime}
                onChange={(v) => handleTimeChange(v, 'endDate')}
                onError={(error) => setEndTimeError(error)}
                slotProps={{
                  textField: {
                    helperText: endTimeError && 'Please enter a valid time.',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <BulkUploadModal open={showBulkModal} handleClose={() => setShowBulkModal(false)} />
    </div>
  );
};

export { EventCreateView };
