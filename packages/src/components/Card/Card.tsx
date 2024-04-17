import { FC, MouseEvent } from 'react';
import { Card as MCard } from '@mui/material';
import styles from './card.module.scss';
import { Rating } from '../Rating';

interface CardProps {
  title?: string;
  artist?: string;
  genres?: string;
  rating?: number;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

type GradientColor = {
  r: number;
  g: number;
  b: number;
};

const getColors = (): GradientColor => {
  const sampleColors = [
    { r: 77, g: 77, b: 255, a: 1 }, // NeonBlue
    { r: 191, g: 64, b: 191, a: 1 }, // NeonPurple
    { r: 94, g: 0, b: 239, a: 1 }, // VividViolet
    { r: 143, g: 0, b: 255, a: 1 }, // ElectricPurple
    { r: 0, g: 255, b: 128, a: 1 }, // NeonGreen
    { r: 255, g: 165, b: 0, a: 1 }, // NeonOrange
    { r: 255, g: 0, b: 255, a: 1 }, // BrightMagenta
    { r: 0, g: 255, b: 255, a: 1 }, // BrightCyan
    { r: 255, g: 20, b: 147, a: 1 }, // DeepPink
    { r: 255, g: 215, b: 0, a: 1 }, // Gold
    { r: 255, g: 105, b: 180, a: 1 }, // HotPink
    { r: 0, g: 191, b: 255, a: 1 }, // DeepSkyBlue
    { r: 173, g: 255, b: 47, a: 1 }, // NeonLime
    { r: 255, g: 255, b: 0, a: 1 }, // NeonYellow
  ];
  return sampleColors[Math.floor(Math.random() * sampleColors.length)];
};

const createRandomGradient = (): string => {
  const color1 = getColors();
  const color2 = getColors();
  const color3 = getColors();
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, rgba(${color1.r},${color1.g},${color1.b}) 0%, rgba(${color2.r},${color2.g},${color2.b}) 35%, rgba(${color3.r},${color3.g},${color3.b}) 100%)`;
};

const Card: FC<CardProps> = (props) => {
  const { title, artist, genres, rating, onClick, className } = props;

  return (
    <div className={`${styles.cardWrapper} ${className}`} onClick={onClick}>
      <div className={styles.cardGlow}>
        <MCard className={styles.card} style={{ background: createRandomGradient() }}>
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
