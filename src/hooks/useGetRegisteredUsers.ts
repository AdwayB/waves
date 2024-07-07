import { useCallback, useEffect, useState } from 'react';
import { EventRegistrations, UserDataResponse } from '../helpers';
import { getEventRegistrations, getUserByIDList } from '../utils';
import { useQuery } from 'react-query';

const fetchRegisteredUserIds = async (eventId: string, pageNumber: number) => {
  console.log('fetching registered user IDs');

  const { data } = await getEventRegistrations(eventId, pageNumber, 100);
  return data as EventRegistrations;
};

const fetchUsers = async (artistIds: string[]) => {
  if (!artistIds || artistIds.length === 0) {
    throw new Error('No artist IDs provided');
  }

  console.log('fetching users');

  const { data } = await getUserByIDList(artistIds);
  return data as UserDataResponse[];
};

const useGetRegisteredUsers = (eventId: string) => {
  const [apiPage, setApiPage] = useState<number>(1);
  const [artistIds, setArtistIds] = useState<string[]>([]);

  const memoizedFetchRegisteredUserIds = useCallback(
    () => fetchRegisteredUserIds(eventId, apiPage),
    [eventId, apiPage],
  );
  const memoizedFetchUsers = useCallback(() => fetchUsers(artistIds), [artistIds]);

  const {
    data: registeredUsers,
    isLoading: isLoadingRegisteredUsers,
    isError: isErrorRegisteredUsers,
  } = useQuery('getRegisteredUsers', memoizedFetchRegisteredUserIds, {
    enabled: !!eventId,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!registeredUsers || !registeredUsers.registeredUsers) {
      return;
    }
    const newArtistIds = new Set(artistIds);
    registeredUsers.registeredUsers
      .filter((id) => !!id && !newArtistIds.has(id))
      .forEach((id) => {
        newArtistIds.add(id);
      });
    newArtistIds.delete('');

    setArtistIds(Array.from(newArtistIds));
  }, [registeredUsers, artistIds]);

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery('getUsers', memoizedFetchUsers, {
    enabled: !!artistIds && artistIds.length > 0,
    keepPreviousData: true,
  });

  return {
    totalRegistrations: registeredUsers?.numberOfRegistrations,
    users,
    isLoading: isLoadingRegisteredUsers || isLoadingUsers,
    isError: isErrorRegisteredUsers || isErrorUsers,
    setApiPage,
  };
};

export { useGetRegisteredUsers };
