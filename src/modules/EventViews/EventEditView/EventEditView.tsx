import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Alert, Button, DatePicker, InputField, InputNumber, Loading, Select } from '../../../components';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './eventEditView.module.scss';
import { Event, EventStatus } from '../../../helpers';
import { EventBody } from '../EventBody';
import dayjs, { Dayjs } from 'dayjs';
import { useGetEventView } from '../../../hooks';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux';

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
  const [eventError, setEventError] = useState<boolean>(false);

  const { eventData, userData, averageRating, isLoading, isError } = useGetEventView(eventId ?? '', true, true);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (eventData?.eventCreatedBy !== currentUser?.UserId) {
      navigate(`/view-event/${eventId}`);
    }
  }, [eventData, currentUser, eventId, navigate]);

  useEffect(() => {
    setEventError(isError);
  }, [isError]);

  useEffect(() => {
    if (eventData) {
      setEventInfo(eventData);
      setEditedData(eventData);
      setStartDate(dayjs(eventData.eventStartDate));
      setEndDate(dayjs(eventData.eventEndDate));
      setStartTime(dayjs(eventData.eventStartDate).format('HH:mm A'));
      setEndTime(dayjs(eventData.eventEndDate).format('HH:mm A'));
      setStatus([eventData.eventStatus ?? 'Scheduled']);
    }
  }, [eventData]);

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
      <Alert visible={eventError} severity="error" onClose={() => setEventError(false)}>
        An error occurred when fetching event data, please try again later.
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
                    value={editedData!['eventName'] ?? 'No-Name Event'}
                    onChange={(e) => handleTextFieldChange(e, 'eventName')}
                  />
                </div>
                <div className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>Edit Event Description</span>
                  <InputField
                    type="text"
                    id={'event-description'}
                    value={editedData!['eventDescription'] ?? ''}
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
                    value={editedData!['eventGenres']?.toString() ?? ''}
                    onChange={(e) => handleTextFieldChange(e, 'eventGenres')}
                  />
                </div>
                <div className={styles.eventEditField}>
                  <span className={styles.eventEditFieldLabel}>Edit Total Seats for Event</span>
                  <InputNumber
                    id={'event-total-seats'}
                    value={editedData!['eventTotalSeats'] ?? 0}
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
          </>
        )}
      </div>
    </div>
  );
};

export { EventEditView };
