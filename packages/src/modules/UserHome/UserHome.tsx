import { Table } from '../../components';
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
        <Table
          columns={[
            { id: 1, title: 'Test1', name: 'test1' },
            { id: 2, title: 'Test2', name: 'test2' },
            { id: 3, title: 'Test3', name: 'test3' },
          ]}
          rows={[
            { test1: 'test1', test2: 'test2', test3: 'test3' },
            { test1: 'test12', test2: 'test22', test3: 'test32' },
            { test1: 'test13', test2: 'test23', test3: 'test33' },
          ]}
          rowsPerPage={1}
        />
      </div>
    </>
  );
};

export { UserHome };
