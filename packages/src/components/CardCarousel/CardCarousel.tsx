import { FC, useEffect, useState } from 'react';
import styles from './cardCarousel.module.scss';
import { Card, CardProps } from '../Card';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface CardCarouselProps {
  items: CardProps[];
}

const CardCarousel: FC<CardCarouselProps> = (props) => {
  const { items } = props;
  const [startIndex, setStartIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [itemsToDisplay, setItemsToDisplay] = useState<number>(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1745) {
        setItemsToDisplay(3);
        setActiveIndex(1);

        if (window.innerWidth < 1065) {
          setItemsToDisplay(1);
          setActiveIndex(0);
        }
      } else {
        setItemsToDisplay(5);
        setActiveIndex(2);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getDisplayItems = (): CardProps[] => {
    const displayItems = [];
    for (let i = 0; i < itemsToDisplay; i++) {
      displayItems.push(items[(startIndex + i) % items.length]);
    }
    return displayItems;
  };

  const handleLeft = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleRight = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const getCardStyle = (index: number) => {
    if (index === activeIndex) {
      return styles.active;
    } else if (index === (activeIndex - 1 || activeIndex + 1)) {
      return styles.adjacent;
    }
    return '';
  };

  return (
    <div className={styles.cardCarousel}>
      <div className={styles.iconContainer} onClick={handleLeft}>
        <NavigateBeforeIcon color="inherit" className={styles.icon} />
      </div>
      {getDisplayItems().map((item, index) => (
        <div className={`${styles.cardContainer} ${getCardStyle(index)}`} key={index}>
          <Card
            key={index}
            {...item}
            className={index === activeIndex ? `${styles.active} ${styles.card}` : styles.card}
          />
        </div>
      ))}
      <div className={styles.iconContainer} onClick={handleRight}>
        <NavigateNextIcon color="inherit" className={styles.icon} />
      </div>
    </div>
  );
};

export { CardCarousel };
export type { CardCarouselProps };
