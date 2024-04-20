import { FC, useEffect, useState } from 'react';
import styles from './cardCarousel.module.scss';
import { Card, CardProps, GradientType } from '../Card';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface CardCarouselProps {
  items: CardProps[];
  uniformSize?: boolean;
  fixedGradient?: boolean;
  gradientType?: GradientType;
  circular?: boolean;
}

const CardCarousel: FC<CardCarouselProps> = (props) => {
  const { items, uniformSize = false, fixedGradient = false, gradientType = 'linear', circular = true } = props;
  const [startIndex, setStartIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [itemsToDisplay, setItemsToDisplay] = useState<number>(5);
  const [leftDisabled, setLeftDisabled] = useState<boolean>(false);
  const [rightDisabled, setRightDisabled] = useState<boolean>(false);

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

  useEffect(() => {
    if (circular) {
      setLeftDisabled(false);
      setRightDisabled(false);
    } else {
      setLeftDisabled(startIndex === 0);
      setRightDisabled(startIndex + itemsToDisplay >= items.length);
    }
  }, [circular, startIndex, itemsToDisplay, items.length]);

  if (items.length === 0) return null;

  const getDisplayItems = (): CardProps[] => {
    const displayItems = [];
    for (let i = 0; i < itemsToDisplay; i++) {
      displayItems.push(items[(startIndex + i) % items.length]);
    }
    return displayItems;
  };

  const handleLeft = () => {
    if (circular) {
      setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    } else {
      setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
    setLeftDisabled(startIndex === 0);
  };

  const handleRight = () => {
    if (circular) {
      setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
    } else {
      setStartIndex((prevIndex) => Math.min(items.length - 1, prevIndex + 1));
    }
    setRightDisabled(startIndex === items.length - 1);
  };

  const getCardStyle = (index: number) => {
    if (!uniformSize) {
      if (index === activeIndex) {
        return styles.active;
      } else if (index === (activeIndex - 1 || activeIndex + 1)) {
        return styles.adjacent;
      }
    }
    return '';
  };

  return (
    <div className={styles.cardCarousel}>
      <div className={`${styles.iconContainer} ${leftDisabled ? styles.iconDisabled : ''}`} onClick={handleLeft}>
        <NavigateBeforeIcon color="inherit" className={styles.icon} />
      </div>
      {getDisplayItems().map((item, index) => (
        <div className={`${styles.cardContainer} ${getCardStyle(index)}`} key={index}>
          <Card
            fixedGradient={fixedGradient}
            gradientType={gradientType}
            key={index}
            {...item}
            className={uniformSize ? '' : index === activeIndex ? `${styles.active} ${styles.card}` : styles.card}
          />
        </div>
      ))}
      <div className={`${styles.iconContainer} ${rightDisabled ? styles.iconDisabled : ''}`} onClick={handleRight}>
        <NavigateNextIcon color="inherit" className={styles.icon} />
      </div>
    </div>
  );
};

// EXAMPLE USAGE
{
  /* <CardCarousel
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
/>; */
}

export { CardCarousel };
export type { CardCarouselProps };
