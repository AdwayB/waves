import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Alert, Button, DatePicker, InputField, InputNumber, Loading, Select, TimeField } from '../../../components';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './eventEditView.module.scss';
import { Event, EventStatus } from '../../../helpers';
import { EventBody } from '../EventBody';
import dayjs, { Dayjs } from 'dayjs';
import { useGetEventView } from '../../../hooks';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux';
import { updateEvent } from '../../../utils';

const sendUpdateEvent = async (eventData: Event) => {
  const response = await updateEvent(eventData);
  return response.status;
};

const EventEditView: FC = () => {
  document.title = 'Edit Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventInfo, setEventInfo] = useState<Event>();
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();
  const [startTime, setStartTime] = useState<Dayjs>();
  const [endTime, setEndTime] = useState<Dayjs>();
  const [startTimeError, setStartTimeError] = useState<string | null>();
  const [endTimeError, setEndTimeError] = useState<string | null>();
  const [status, setStatus] = useState<string[]>();
  const [eventError, setEventError] = useState<boolean>(false);
  const [eventUpdateError, setEventUpdateError] = useState<boolean>(false);
  const [formDataError, setFormDataError] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [updateComplete, setUpdateComplete] = useState<boolean>(false);

  const { eventData, userData, averageRating, isLoading, isError } = useGetEventView(eventId ?? '', true, true);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (eventData?.eventCreatedBy !== currentUser?.userId) {
      navigate(`/view-event/${eventId}`);
    }
  }, [eventData, currentUser, eventId, navigate]);

  useEffect(() => {
    setEventError(isError);
  }, [isError]);

  useEffect(() => {
    if (eventData) {
      setEventInfo(eventData);
      setStartDate(dayjs(eventData.eventStartDate).local());
      setEndDate(dayjs(eventData.eventEndDate).local());
      setStartTime(dayjs(eventData.eventStartDate).local());
      setEndTime(dayjs(eventData.eventEndDate).local());
      setStatus([eventData.eventStatus ?? 'Scheduled']);
    }
  }, [eventData]);

  useEffect(() => {
    setEventInfo((prev) => {
      if (!prev) return undefined;
      if (!status) return prev;
      return { ...prev, eventStatus: status[0] };
    });
  }, [status]);

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
        if (!prev) return undefined;
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

  const handleEditEvent = async () => {
    if (!validateFormData()) {
      setFormDataError(true);
      return;
    }
    setUpdateLoading(true);
    const responseStatus = await sendUpdateEvent(eventInfo);
    if (responseStatus !== 200) {
      setEventUpdateError(true);
    }
    setUpdateLoading(false);
    setUpdateComplete(true);
  };

  return (
    <div className={styles.eventContainer}>
      <Alert visible={eventError} severity="error" onClose={() => setEventError(false)}>
        An error occurred when fetching event data, please try again later.
      </Alert>
      <Alert visible={eventUpdateError} severity="error" onClose={() => setEventUpdateError(false)}>
        An error occurred when updating event data, please try again later.
      </Alert>
      <Alert
        visible={updateComplete}
        severity="success"
        onClose={() => {
          setUpdateComplete(false);
          navigate('/');
        }}
      >
        Successfully edited event!
      </Alert>
      <Alert visible={formDataError} severity="error" onClose={() => setFormDataError(false)}>
        Invalid Data! Please verify your inputs and try again.
      </Alert>
      <div className={styles.eventInfoHeader}>
        <div className={styles.eventInfoHeaderLeft}>
          <Button label="Back" onClick={() => navigate(-1)} className={styles.backButton} />
        </div>
        <span className={styles.eventTitle}>
          Edit Event - <span className={styles.eventName}>{eventInfo.eventName}</span>
        </span>
        <div className={styles.eventInfoHeaderRight}>
          <div className={styles.eventActions}>
            <Button
              label="Save Changes"
              buttontype="secondary"
              onClick={handleEditEvent}
              className={styles.saveButton}
              disabled={eventUpdateError}
              buttonloading={updateLoading}
            />
          </div>
        </div>
      </div>
      <div className={styles.eventEditBody}>
        {isLoading ? (
          <div className={styles.eventLoading}>
            <Loading type="progress" />
          </div>
        ) : (
          <>
            <div className={styles.eventViewBody}>
              <EventBody eventInfo={eventInfo} rating={averageRating ?? '0'} userInfo={userData!} />
            </div>
            <div className={styles.eventEditFields}>
              <span className={styles.eventEditFieldsTitle}>Edit Fields</span>
              <div className={styles.eventEditFieldsBody}>
                <div className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>Edit Event Name</span>
                  <InputField
                    type="text"
                    id={'event-name'}
                    value={eventInfo!['eventName'] ?? 'No-Name Event'}
                    onChange={(e) => handleTextFieldChange(e, 'eventName')}
                  />
                </div>
                <div className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>Edit Event Description</span>
                  <InputField
                    type="text"
                    id={'event-description'}
                    value={eventInfo!['eventDescription'] ?? ''}
                    onChange={(e) => handleTextFieldChange(e, 'eventDescription')}
                  />
                </div>
                <div className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>Edit Event Genres</span>
                  <span className={styles.eventEditFieldSubTitle}>
                    Enter a list separated by commas, e.g. Rock, Pop
                  </span>
                  <InputField
                    type="text"
                    id={'event-genres'}
                    value={eventInfo!['eventGenres']?.toString() ?? ''}
                    onChange={(e) => handleTextFieldChange(e, 'eventGenres')}
                  />
                </div>
                <div className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>Edit Total Seats for Event</span>
                  <InputNumber
                    id={'event-total-seats'}
                    value={eventInfo!['eventTotalSeats'] ?? 0}
                    onChange={(e) => handleTextFieldChange(e, 'eventTotalSeats')}
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
                  <span className={styles.eventEditFieldSubTitle}>Enter a time in the 24H format, eg: 18:00</span>
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
                <div className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>Edit End Time</span>
                  <span className={styles.eventEditFieldSubTitle}>Enter a time in the 24H format, eg: 18:00</span>
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
                <div className={styles.eventEditField} style={{ marginTop: '1rem', marginLeft: '0.3rem' }}>
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
          </>
        )}
      </div>
    </div>
  );
};

export { EventEditView };
