import { ChangeEvent, FC } from 'react';
import { Card, CardProps } from '../Card';
import { Pagination } from '../Pagination';
import styles from './paginatedCards.module.scss';

interface PaginatedCardsProps {
  data: CardProps[];
  page: number;
  pageCount: number;
  onPageChange: (event: ChangeEvent<unknown>, value: number) => void;
}

/**
 * A component that displays a paginated list of cards with a static background.
 *
 * @param {PaginatedCardsProps} props - The props for the Paginated Cards component.
 */
const PaginatedCards: FC<PaginatedCardsProps> = (props) => {
  const { data, page = 1, pageCount = 10, onPageChange } = props;

  return (
    <div className={styles.paginatedGroup}>
      <div className={styles.cardsContainer}>
        {data.map((event, index) => (
          <div className={styles.card} key={index}>
            <Card
              key={index}
              title={event.title}
              artist={event.artist}
              genres={event.genres}
              rating={event.rating}
              startDate={event.startDate}
              staticBackground
            />
          </div>
        ))}
      </div>
      <Pagination count={pageCount} page={page} onChange={onPageChange} className={styles.pagination} />
    </div>
  );
};

export { PaginatedCards };
