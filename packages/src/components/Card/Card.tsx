import { FC, MouseEvent } from 'react';
import { Card as MCard } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import styles from './card.module.scss';
import { styled } from '@mui/material/styles';
import { Rating } from '../Rating';

const StyledCard = styled(MCard)({
  borderRadius: '1rem',
  boxShadow: 'none',
  position: 'relative',
  minWidth: 200,
  minHeight: 360,
  '&:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '64%',
    bottom: 0,
    zIndex: 1,
    background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
  },
});

const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 0,
  backgroundPosition: 'top',
});

const Content = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 2),
  position: 'absolute',
  zIndex: 2,
  bottom: 0,
  width: '100%',
}));

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
          <Content>
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
          </Content>
        </MCard>
      </div>
    </div>
  );
};

export { StyledCard, StyledCardMedia, Content, Card };
