import { useSelector } from 'react-redux';
import { Sidebar } from '../../components';
import { AuthAndInit } from '../../helpers';
import { NestedRoutes } from '../../routes';
import styles from './layout.module.scss';
import { selectCurrentUser } from '../../redux';
import { FC } from 'react';

const AppLayout: FC = () => {
  const userName = useSelector(selectCurrentUser)?.legalName;

  return (
    <div className={styles.appLayout}>
      <div className={styles.sidebar}>
        <Sidebar userName={userName} />
      </div>
      <div className={styles.main}>
        <NestedRoutes />
      </div>
    </div>
  );
};

const Layout = AuthAndInit(AppLayout);
export { Layout };
