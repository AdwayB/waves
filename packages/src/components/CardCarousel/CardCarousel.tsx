import { FC, useEffect, useState } from 'react';
import styles from './cardCarousel.module.scss';
import { Card, CardProps } from '../Card';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button } from '../Button';

interface CardCarouselProps {
  items: CardProps[];
}

const CardCarousel: FC<CardCarouselProps> = (props) => {
  const { items } = props;
  const [active, setActive] = useState(2);

  useEffect(() => {});

  const handleLeft = () => {
    setActive((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleRight = () => {
    setActive((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const getCardStyle = (index: number) => {
    if (index === active) {
      return styles.active;
    } else if (index === (active - 1 || active + 1)) {
      return styles.adjacent;
    }
  };

  return (
    <div className={styles.cardCarousel}>
      <div className={styles.buttonContainer}>
        <Button label={<NavigateBeforeIcon />} onClick={handleLeft} />
      </div>
      {items.slice(active, active + 5).map((item, index) => (
        <div className={`${styles.cardContainer} ${getCardStyle(index)}`} key={index}>
          <Card key={index} {...item} />
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <Button label={<NavigateNextIcon />} onClick={handleRight} />
      </div>
    </div>
  );
};

export { CardCarousel };
export type { CardCarouselProps };
