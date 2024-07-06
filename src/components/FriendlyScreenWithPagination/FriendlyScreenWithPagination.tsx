import { FC } from 'react';
import styles from './friendlyScreenWithPagination.module.scss';
import { Pagination } from '../Pagination';

interface FriendlyScreenWithPaginationProps {
  friendlyScreenMessage?: string;
  friendlyScreenHeight?: string;
}

/**
 * A friendly screen component with disabled pagination.
 * @param friendlyScreenMessage - The message to display.
 * @param friendlyScreenHeight - The height of the friendly screen.
 * @param {FriendlyScreenWithPaginationProps} - The props for the FriendlyScreenWithPagination component.
 */
const FriendlyScreenWithPagination: FC<FriendlyScreenWithPaginationProps> = (props) => {
  const { friendlyScreenMessage = 'No data to display!', friendlyScreenHeight = '300px' } = props;
  return (
    <div className={styles.friendlyScreenWithPagination} style={{ height: friendlyScreenHeight }}>
      <div className={styles.friendlyScreen}>
        <div className={styles.friendlyScreenText}>{friendlyScreenMessage}</div>
      </div>
      <Pagination count={5} page={1} onChange={() => null} disabled />
    </div>
  );
};

export { FriendlyScreenWithPagination };
