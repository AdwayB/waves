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
      </div>
    </>
  );
};

export { UserHome };
