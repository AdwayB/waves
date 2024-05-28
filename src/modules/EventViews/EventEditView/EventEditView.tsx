import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Checkbox } from '../../../components';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './eventEditView.module.scss';
import { Event, EventTestData } from '../../../helpers';
import { EventBody } from '../EventBody';
import { EventEditFields } from './EventEditFields';

const EventEditView: FC = () => {
  document.title = 'Edit Event - Waves';
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventInfo, setEventInfo] = useState<Event>();
  const [editedData, setEditedData] = useState<Event | null>(null);
  const [editList, setEditList] = useState<string[]>([]);
  const eventData = EventTestData;

  useEffect(() => {
    const foundEvent = eventData.find((event) => event.EventId === eventId);
    foundEvent && (setEventInfo(foundEvent), setEditedData(foundEvent));
  }, [eventData, eventId]);

  if (!eventInfo) {
    return <div className={styles.eventFriendlyScreen}>Event not found!</div>;
  }

  const handleCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setEditList([...editList, e.target.name]);
    } else {
      setEditList(editList.filter((item) => item !== e.target.name));
    }
  };

  const getChecked = (fieldName: string) => {
    return editList.includes(fieldName);
  };

  const handleEditFieldsChange = (e: Event) => {
    setEditedData(e);
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
        <div className={styles.eventInfoHeaderRight}>
          <span className={styles.eventTitle}>Edit Event</span>
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
      <div className={styles.eventBody}>
        <EventBody eventInfo={eventInfo} />
        <div className={styles.eventEditChecklist}>
          <span className={styles.eventEditChecklistTitle}>Choose the fields you would like to edit:</span>
          <Checkbox
            items={[
              {
                label: 'Name',
                name: 'EventName',
                checked: getChecked('EventName'),
                onClick: () => handleCheckboxClick,
              },
              {
                label: 'Description',
                name: 'EventDescription',
                checked: getChecked('EventDescription'),
                onClick: () => handleCheckboxClick,
              },
              {
                label: 'Total Seats',
                name: 'EventTotalSeats',
                checked: getChecked('EventTotalSeats'),
                onClick: () => handleCheckboxClick,
              },
              {
                label: 'Genres',
                name: 'EventGenres',
                checked: getChecked('EventGenres'),
                onClick: () => handleCheckboxClick,
              },
              {
                label: 'Collaborators',
                name: 'EventCollab',
                checked: getChecked('collaborators'),
                onClick: () => handleCheckboxClick,
              },
              {
                label: 'Start Date',
                name: 'startDate',
                checked: getChecked('startDate'),
                onClick: () => handleCheckboxClick,
              },
              {
                label: 'Start Time',
                name: 'startTime',
                checked: getChecked('startTime'),
                onClick: () => handleCheckboxClick,
              },
              {
                label: 'End Date',
                name: 'endDate',
                checked: getChecked('endDate'),
                onClick: () => handleCheckboxClick,
              },
              {
                label: 'End Time',
                name: 'endTime',
                checked: getChecked('endTime'),
                onClick: () => handleCheckboxClick,
              },
              // {
              //   label: 'Location',
              //   name: 'EventLocation',
              //   checked: getChecked('EventLocation'),
              //   onClick: () => handleCheckboxClick,
              // },
              {
                label: 'Status',
                name: 'EventStatus',
                checked: getChecked('EventStatus'),
                onClick: () => handleCheckboxClick,
              },
            ]}
          />
        </div>
        <div className={styles.eventEditFields}>
          <span className={styles.eventEditFieldsTitle}>Edit Fields</span>
          <div className={styles.eventEditFieldsBody}>
            <EventEditFields editList={editList} eventData={editedData!} setEventData={handleEditFieldsChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventEditView };
