import { useEffect, useRef } from 'react';
import { CardCarousel } from '../../components';
import styles from './userHome.module.scss';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

const UserHome = () => {
  document.title = 'Home - Waves';
  const testRegistrations = 5 as const;
  const userName = 'Test User';
  const welcomeTextRef = useRef<HTMLSpanElement>(null);
  const welcomeNameRef = useRef<HTMLSpanElement>(null);
  const welcomeExclamationRef = useRef<HTMLSpanElement>(null);
  gsap.registerPlugin(TextPlugin);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'none' }, repeat: -1, repeatDelay: 1 });

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
        text: userName,
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
  }, []);

  return (
    <>
      <div className={styles.userHomeContainer}>
        <div className={styles.userHomeWelcomeContainer}>
          <span className={styles.welcomeHeading}>
            <span ref={welcomeTextRef} />
            <span ref={welcomeNameRef} className={styles.welcomeName} />
            <span ref={welcomeExclamationRef} />
          </span>
          <span className={styles.welcomeText}>You have {testRegistrations} upcoming events.</span>
        </div>
        <div className={styles.userHomeRegisteredEventsContainer}>
          <CardCarousel
            fixedGradient
            items={[
              { title: 'Test Card Carousel', artist: 'Test Artist', genres: 'Test Genres', rating: 1 },
              { title: 'Test Card Carousel 2', artist: 'Test Artist 2', genres: 'Test Genres 2', rating: 1.5 },
              { title: 'Test Card Carousel 3', artist: 'Test Artist 3', genres: 'Test Genres 3', rating: 2 },
              { title: 'Test Card Carousel 4', artist: 'Test Artist 4', genres: 'Test Genres 4', rating: 2.5 },
              { title: 'Test Card Carousel 5', artist: 'Test Artist 5', genres: 'Test Genres 5', rating: 3 },
              { title: 'Test Card Carousel 6', artist: 'Test Artist 6', genres: 'Test Genres 6', rating: 3.5 },
              { title: 'Test Card Carousel 7', artist: 'Test Artist 7', genres: 'Test Genres 7', rating: 4 },
              { title: 'Test Card Carousel 8', artist: 'Test Artist 8', genres: 'Test Genres 8', rating: 4.5 },
              { title: 'Test Card Carousel 9', artist: 'Test Artist 9', genres: 'Test Genres 9', rating: 5 },
              { title: 'Test Card Carousel 10', artist: 'Test Artist 10', genres: 'Test Genres 10', rating: 0 },
            ]}
          />
        </div>
        <div className={styles.userHomeRecommendedEventsContainer}>
          <div className={styles.recommendedEventsHeader}>
            <span className={styles.recommendedEventsHeading}>Here are some other events you may like!</span>
            <span className={styles.recommendedEventsText}>(Recommendations are based on your activity)</span>
          </div>
          <div className={styles.recommendedEventsCarouselContainer}>
            <CardCarousel
              fixedGradient
              gradientType="radial"
              circular={false}
              uniformSize
              items={[
                { title: 'Test Recommendation 1', artist: 'Test Artist 1', genres: 'Test Genre 1', rating: 1 },
                { title: 'Test Recommendation 2', artist: 'Test Artist 2', genres: 'Test Genre 2', rating: 2 },
                { title: 'Test Recommendation 3', artist: 'Test Artist 3', genres: 'Test Genre 3', rating: 3 },
                { title: 'Test Recommendation 4', artist: 'Test Artist 4', genres: 'Test Genre 4', rating: 4 },
                { title: 'Test Recommendation 5', artist: 'Test Artist 5', genres: 'Test Genre 5', rating: 5 },
                { title: 'Test Recommendation 6', artist: 'Test Artist 6', genres: 'Test Genre 6', rating: 0 },
                { title: 'Test Recommendation 7', artist: 'Test Artist 7', genres: 'Test Genre 7', rating: 0 },
                { title: 'Test Recommendation 8', artist: 'Test Artist 8', genres: 'Test Genre 8', rating: 0 },
                { title: 'Test Recommendation 9', artist: 'Test Artist 9', genres: 'Test Genre 9', rating: 0 },
                { title: 'Test Recommendation 10', artist: 'Test Artist 10', genres: 'Test Genre 10', rating: 0 },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { UserHome };
