import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Button,
  CardProps,
  FriendlyScreenWithPagination,
  LoadingWithPagination,
  PaginatedCards,
} from '../../components';
import styles from './userHome.module.scss';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux';
import { useGetUserRegisteredEventData } from '../../hooks';
import { getCardData } from '../../helpers';
import dayjs from 'dayjs';

const UserHome = () => {
  document.title = 'Home - Waves';
  const currentUser = useSelector(selectCurrentUser);
  const currentUserName = currentUser?.LegalName ?? 'User';
  const currentUserId = currentUser?.UserId;

  const [page, setPage] = useState<number>(1);
  const [pageLength, setPageLength] = useState<number>(1);
  const [mappedCardData, setMappedCardData] = useState<CardProps[]>([]);
  const [error, setError] = useState<boolean>(false);

  const welcomeTextRef = useRef<HTMLSpanElement>(null);
  const welcomeNameRef = useRef<HTMLSpanElement>(null);
  const welcomeExclamationRef = useRef<HTMLSpanElement>(null);

  gsap.registerPlugin(TextPlugin);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'none' } });

    if (welcomeTextRef.current) {
      timeline.to(welcomeTextRef.current, {
        duration: 1,
        text: 'Welcome back, ',
        ease: 'none',
      });
    }

    if (welcomeNameRef.current) {
      timeline.to(welcomeNameRef.current, {
        duration: 1,
        text: currentUserName,
        ease: 'none',
      });
    }

    if (welcomeExclamationRef.current) {
      timeline.to(welcomeExclamationRef.current, {
        duration: 0.15,
        text: ' !',
        ease: 'none',
      });
    }
  }, [currentUserName]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1366) {
        setPageLength(8);
        if (window.innerWidth < 1165) setPageLength(6);
        if (window.innerWidth < 768) setPageLength(4);
        if (window.innerWidth < 615) setPageLength(3);
      } else {
        setPageLength(12);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { registeredEventData, numberOfRegistrations, userData, isLoading, isError, setApiPage } =
    useGetUserRegisteredEventData(currentUserId ?? '');

  const filteredRegisteredEventsWithArtistNames = useMemo(() => {
    return registeredEventData
      .filter((event) => dayjs(event.eventEndDate).utc().isAfter(dayjs().utc(), 'day'))
      .map((event) => {
        return {
          ...event,
          eventCreatedBy: event.eventCreatedBy
            ? userData?.find((user) => user.userId === event.eventCreatedBy)?.legalName
            : '',
        };
      });
  }, [registeredEventData, userData]);

  useEffect(() => {
    if (!!filteredRegisteredEventsWithArtistNames && userData) {
      setMappedCardData(getCardData(filteredRegisteredEventsWithArtistNames, userData));
    }
  }, [filteredRegisteredEventsWithArtistNames, userData]);

  const pageCount = useMemo(() => {
    return !!mappedCardData ? Math.ceil(mappedCardData.length / pageLength) : 0;
  }, [mappedCardData, pageLength]);

  const displayData = useMemo(() => {
    const start = (page - 1) * pageLength;
    const end = start + pageLength;
    return !!mappedCardData ? mappedCardData.slice(start, end) : [];
  }, [mappedCardData, page, pageLength]);

  useEffect(() => {
    setError(isError);
  }, [isError]);

  const handlePageChange = (e: ChangeEvent<unknown>, v: number) => {
    setPage(v);
  };

  const handleGetNextApiPage = () => {
    setApiPage((prev) => prev + 1);
  };

  return (
    <>
      <div className={styles.userHomeContainer}>
        <Alert visible={error} severity="error" onClose={() => setError(false)}>
          Error in fetching registered events. Please try again later.
        </Alert>
        <div className={styles.userHomeWelcomeContainer}>
          <span className={styles.welcomeHeading}>
            <span ref={welcomeTextRef} />
            <span ref={welcomeNameRef} className={styles.welcomeName} />
            <span ref={welcomeExclamationRef} />
          </span>
          <span className={styles.welcomeText}>
            You have {filteredRegisteredEventsWithArtistNames.length} upcoming events.
          </span>
        </div>
        <div className={styles.userHomeRegisteredEventsContainer}>
          {isLoading ? (
            <div className={styles.userHomeRegisteredEventsLoading}>
              <LoadingWithPagination />
            </div>
          ) : numberOfRegistrations === 0 || filteredRegisteredEventsWithArtistNames.length === 0 ? (
            <FriendlyScreenWithPagination
              friendlyScreenHeight="500px"
              friendlyScreenMessage="No upcoming registrations."
            />
          ) : (
            <PaginatedCards data={displayData} page={page} pageCount={pageCount} onPageChange={handlePageChange} />
          )}
          <div className={styles.loadMoreRegistrationsContainer}>
            <div className={styles.loadMoreRegistrationsWrapper}>
              <span className={styles.registrationsInfo}>
                Total Events:{' '}
                <span className={styles.registrationsCount}>{filteredRegisteredEventsWithArtistNames.length}</span>
              </span>
              <span className={styles.registrationsInfo}>
                Visible Events: <span className={styles.registrationsCount}>{mappedCardData.length}</span>
              </span>
            </div>
            <Button label="Load More Events" onClick={handleGetNextApiPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export { UserHome };
