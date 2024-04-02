import { FC, SyntheticEvent } from 'react';
import { Rating as MRating } from '@mui/material';
import styles from './rating.module.scss';

interface RatingProps {
  precision?: number;
  value?: number;
  onChange?: (event: SyntheticEvent, value?: number | null) => void;
  readonly?: boolean;
  className?: string;
}

const Rating: FC<RatingProps> = (props) => {
  const { precision, value = 0, onChange, readonly = true, className } = props;

  return (
    <div className={`${styles.ratingWrapper} ${className}`}>
      <MRating
        precision={precision ?? 0.1}
        value={value}
        onChange={onChange}
        readOnly={readonly}
        className={className}
      />
    </div>
  );
};

export { Rating, RatingProps };
