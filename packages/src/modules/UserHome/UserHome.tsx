import { Card, CardCarousel } from '../../components';
import styles from './userHome.module.scss';

const UserHome = () => {
  const testRegistrations = 5 as const;

  return (
    <>
      <div className={styles.userHomeContainer}>
        <div className={styles.userHomeWelcomeContainer}>
          <span className={styles.welcomeHeading}>
            Welcome back, <span className={styles.welcomeName}>Test User</span>!
          </span>
          <span className={styles.welcomeText}>You have {testRegistrations} upcoming events.</span>
        </div>
        <div className={styles.userHomeRegistrationsTableContainer}>
          <table className={styles.userHomeRegistrationsTable}>
            <thead>
              <tr>
                <th className={styles.userHomeTableHead}>Event Name</th>
                <th className={styles.userHomeTableHead}>Date</th>
                <th className={styles.userHomeTableHead}>Time</th>
                <th className={styles.userHomeTableHead}>Location</th>
                <th className={styles.userHomeTableHead}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.userHomeTableData}>Test Event</td>
                <td className={styles.userHomeTableData}>2023-03-08</td>
                <td className={styles.userHomeTableData}>10:00 AM</td>
                <td className={styles.userHomeTableData}>Test Location</td>
                <td className={styles.userHomeTableData}>Registered</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.userHomeRecommendationsContainer}>
          <span className={styles.recommendationsHeading}>Here are a few events you might like!</span>
          <span className={styles.recommendationsText}>Test Event</span>
          <span className={styles.recommendationsText}>Test Event 2</span>
          <span className={styles.recommendationsText}>Test Event 3</span>
          <span className={styles.recommendationsText}>Test Event 4</span>
          <span className={styles.recommendationsText}>Test Event 5</span>
        </div>
        {/* <Table
          title="Test Table"
          columns={[
            { id: 1, title: 'Test1', name: 'test1' },
            { id: 2, title: 'Test2', name: 'test2' },
            { id: 3, title: 'Test3', name: 'test3' },
          ]}
          rows={[
            { test1: 'test1', test2: 'test2', test3: 'test3' },
            { test1: 'test16', test2: 'test26', test3: 'test36' },
            { test1: 'test19', test2: 'test29', test3: 'test39' },
            { test1: 'test10', test2: 'test20', test3: 'test30' },
            { test1: 'test11', test2: 'test21', test3: 'test31' },
            { test1: 'test17', test2: 'test27', test3: 'test37' },
            { test1: 'test12', test2: 'test22', test3: 'test32' },
            { test1: 'test13', test2: 'test23', test3: 'test33' },
            { test1: 'test14', test2: 'test24', test3: 'test34' },
            { test1: 'test15', test2: 'test25', test3: 'test35' },
            { test1: 'test16', test2: 'test26', test3: 'test36' },
            { test1: 'test17', test2: 'test27', test3: 'test37' },
            { test1: 'test18', test2: 'test28', test3: 'test38' },
            { test1: 'test12', test2: 'test22', test3: 'test32' },
            { test1: 'test13', test2: 'test23', test3: 'test33' },
            { test1: 'test14', test2: 'test24', test3: 'test34' },
            { test1: 'test15', test2: 'test25', test3: 'test35' },
            { test1: 'test18', test2: 'test28', test3: 'test38' },
            { test1: 'test19', test2: 'test29', test3: 'test39' },
            { test1: 'test10', test2: 'test20', test3: 'test30' },
          ]}
          rowsPerPage={10}
        /> */}
        <Card
          title="Test Card"
          artist="Test Artist"
          genres="Test Genres, Test Genres 2, Test Genres 3, Test Genres 4, Test Genres 5, Test Genres 6 , Test Genres 7, Test Genres 8, Test Genres 9, Test Genres 10"
          rating={4.5}
          className={styles.testCard}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CardCarousel
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
      </div>
    </>
  );
};

export { UserHome };
