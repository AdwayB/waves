import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Alert, Button, DatePicker, InputField, InputNumber, Select, TimeField } from '../../../components';
import { useNavigate } from 'react-router-dom';
import styles from './eventCreateView.module.scss';
import { CreateEvent, Event, EventStatus, UserType } from '../../../helpers';
import { EventBody } from '../EventBody';
import dayjs, { Dayjs } from 'dayjs';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux';
import { createEvent } from '../../../utils';

const sendCreateEvent = async (eventData: Event) => {
  const response = await createEvent(eventData);
  return response.status;
};

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
  const [startTime, setStartTime] = useState<Dayjs>();
  const [endTime, setEndTime] = useState<Dayjs>();
  const [startTimeError, setStartTimeError] = useState<string | null>();
  const [endTimeError, setEndTimeError] = useState<string | null>();
  const [status, setStatus] = useState<string[]>();
  const [eventError, setEventError] = useState<boolean>(false);
  const [eventCreateError, setEventCreateError] = useState<boolean>(false);
  const [eventCreateSuccess, setEventCreateSuccess] = useState<boolean>(false);
  const [formDataError, setFormDataError] = useState<boolean>(false);
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  useEffect(() => {
    if (eventInfo) {
      setStartDate(dayjs(eventInfo.eventStartDate).local());
      setEndDate(dayjs(eventInfo.eventEndDate).local());
      setStartTime(dayjs(eventInfo.eventStartDate).local());
      setEndTime(dayjs(eventInfo.eventEndDate).local());
      setStatus([eventInfo.eventStatus ?? 'Scheduled']);
    }
  }, [eventInfo]);

  useEffect(() => {
    setEventInfo((prev) => {
      if (!status) return prev;
      return { ...prev, eventStatus: status[0] };
    });
  }, [status]);

  const currentUser = useSelector(selectCurrentUser);

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

  const handleTimeChange = (time: Dayjs, fieldName: string) => {
    switch (fieldName) {
      case 'startDate':
        setStartTime(time);
        updateEventDateTime('eventStartDate', startDate, time);
        break;
      case 'endDate':
        setEndTime(time);
        updateEventDateTime('eventEndDate', endDate, time);
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

  const handleCreateEvent = () => {
    if (!validateFormData()) {
      setFormDataError(true);
      return;
    }
    setCreateLoading(true);
    setTimeout(async () => {
      const responseStatus = await sendCreateEvent(eventInfo);
      if (responseStatus !== 200) {
        setEventCreateError(true);
      }
      setCreateLoading(false);
    }, 500);
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
          navigate('/');
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
        <span className={styles.eventTitle}>Create Event</span>
        <div className={styles.eventInfoHeaderRight}>
          <div className={styles.eventActions}>
            <Button
              label="Save Changes"
              buttontype="secondary"
              onClick={handleCreateEvent}
              className={styles.saveButton}
              disabled={eventCreateError}
              buttonloading={createLoading}
            />
          </div>
        </div>
      </div>
      <div className={styles.eventCreateBody}>
        <div className={styles.eventViewBody}>
          <span className={styles.eventViewTitle}>See how your event will appear to users.</span>
          <EventBody
            eventInfo={eventInfo}
            rating={'0'}
            userInfo={{
              userId: currentUser?.UserId ?? '',
              legalName: currentUser?.LegalName,
              email: currentUser?.Email ?? '',
              type: currentUser?.Type ?? UserType.User,
              mobileNumber: currentUser?.MobileNumber,
              country: currentUser?.Country,
              password: currentUser?.Password,
              userName: currentUser?.Username,
            }}
          />
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
                value={startTime ?? dayjs()}
                onChange={(v) => handleTimeChange(v ?? dayjs(), 'startDate')}
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
                value={endTime ?? dayjs()}
                onChange={(v) => handleTimeChange(v ?? dayjs(), 'endDate')}
                onError={(error) => setEndTimeError(error)}
                slotProps={{
                  textField: {
                    helperText: endTimeError && 'Please enter a valid time.',
                  },
                }}
              />
            </div>
            <div className={styles.eventCreateField} style={{ marginTop: '1rem', marginLeft: '0.3rem' }}>
              <span className={styles.eventCreateFieldLabel}>Enter Event Status</span>
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

export { EventCreateView };
