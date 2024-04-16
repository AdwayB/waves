import { FC, MouseEvent } from 'react';
import { Card as MCard, CardMedia } from '@mui/material';
import styles from './card.module.scss';
import { Rating } from '../Rating';

interface CardProps {
  bgImage?: string;
  title?: string;
  artist?: string;
  genres?: string;
  rating?: number;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const Card: FC<CardProps> = (props) => {
  const {
    bgImage = 'https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$',
    title,
    artist,
    genres,
    rating,
    onClick,
    className,
  } = props;

  return (
    <div className={styles.cardWrapper} style={{ width: '300px', height: '360px' }} onClick={onClick}>
      <div className={styles.cardGlow}>
        <MCard className={`${styles.card} ${className}`}>
          <CardMedia className={styles.cardMedia} image={bgImage} />
          <div className={styles.cardContent}>
            <div className={styles.titleAndRating}>
              <span className={styles.cardTitle}>{title}</span>
              <span className={styles.cardRating}>
                <Rating precision={0.1} value={rating} />
              </span>
            </div>
            <div className={styles.cardArtist}>{artist}</div>
            <div className={styles.cardGenres}>{genres}</div>
          </div>
        </MCard>
      </div>
    </div>
  );
};

export { Card };
export type { CardProps };
