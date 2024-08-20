import { useMemo, useEffect, useState } from 'react';
import { getUserByIDList } from '../utils';
import { Event, UserData } from '../helpers';

const useGetEventCreators = (eventData: Event[]) => {
  const [userData, setUserData] = useState<UserData[]>([]);

  const uniqueUserIds = useMemo(() => {
    const userIds = new Set<string>();
    eventData.forEach((event) => {
      if (event.eventCreatedBy) {
        userIds.add(event.eventCreatedBy);
      }
    });
    return Array.from(userIds);
  }, [eventData]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (uniqueUserIds.length > 0) {
        try {
          const usersResponse = await getUserByIDList(uniqueUserIds);
          setUserData(usersResponse.data as UserData[]);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };
    fetchUserData();
  }, [uniqueUserIds]);

  return userData;
};

export { useGetEventCreators };
