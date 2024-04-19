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
  fixedGradient?: boolean;
  className?: string;
}

type GradientColor = {
  r: number;
  g: number;
  b: number;
};

const sampleColors: GradientColor[] = [
  { r: 77, g: 77, b: 255 }, // NeonBlue
  { r: 191, g: 64, b: 191 }, // NeonPurple
  { r: 94, g: 0, b: 239 }, // VividViolet
  { r: 143, g: 0, b: 255 }, // ElectricPurple
  { r: 255, g: 0, b: 255 }, // BrightMagenta
  { r: 255, g: 20, b: 147 }, // DeepPink
  { r: 255, g: 105, b: 180 }, // HotPink
  { r: 0, g: 191, b: 255 }, // DeepSkyBlue
  { r: 0, g: 255, b: 128 }, // NeonGreen
  { r: 255, g: 165, b: 0 }, // NeonOrange
  { r: 0, g: 255, b: 255 }, // BrightCyan
  { r: 255, g: 215, b: 0 }, // Gold
  { r: 173, g: 255, b: 47 }, // NeonLime
  { r: 255, g: 255, b: 0 }, // NeonYellow
];

const getRandomColors = (): GradientColor => {
  return sampleColors[Math.floor(Math.random() * sampleColors.length)];
};

const getFixedColors = (): GradientColor => {
  return sampleColors[Math.floor(Math.random() * (sampleColors.length - 7))];
};

const createRandomGradient = (fixedGradient: boolean): string => {
  const getColors = fixedGradient ? getFixedColors : getRandomColors;
  const color1 = getColors();
  const color2 = getColors();
  const color3 = getColors();
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, rgba(${color1.r},${color1.g},${color1.b}) 0%, rgba(${color2.r},${color2.g},${color2.b}) 35%, rgba(${color3.r},${color3.g},${color3.b}) 100%)`;
};

const Card: FC<CardProps> = (props) => {
  const { title, artist, genres, rating, onClick, fixedGradient = false, className } = props;

  return (
    <div className={`${styles.cardWrapper} ${className}`} onClick={onClick}>
      <div className={styles.cardGlow}>
        <MCard className={styles.card} style={{ background: createRandomGradient(fixedGradient) }}>
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
