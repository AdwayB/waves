import { FC, useEffect, useState } from 'react';
import styles from './slider.module.scss';
import { Slider as MSlider } from '@mui/material';

type SliderMarks = { label: string | number; value: number };

interface SliderProps {
  label?: string;
  marks?: SliderMarks[];
  min?: number;
  max?: number;
  value: number;
  onChange: (event: Event, value: number | number[]) => void;
  disabled?: boolean;
  steps?: number | null;
  markerSize?: 'regular' | 'large';
  className?: string;
}

/**
 * A Slider component.
 * Can have custom step length or default to markers when null.
 *
 * @param {SliderProps} props - The props for the slider component.
 */
const Slider: FC<SliderProps> = (props) => {
  const {
    label,
    marks,
    min,
    max,
    value,
    onChange,
    disabled = false,
    steps = 1,
    markerSize = 'regular',
    className,
  } = props;
  const [marksArray, setMarksArray] = useState<SliderMarks[]>(marks || []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1400) {
        const newMarksArray =
          marks?.map((mark) => ({
            ...mark,
            label: '',
          })) || [];
        setMarksArray(newMarksArray);
      } else {
        setMarksArray(marks || []);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [marks, marksArray]);

  return (
    <div className={`${styles.sliderWrapper} ${className} ${markerSize === 'large' ? styles.largeMarker : ''}`}>
      {label && <span className={styles.sliderLabel}>{label}</span>}
      <MSlider
        marks={marksArray}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        disabled={disabled}
        step={steps}
      />
    </div>
  );
};

export { Slider };
export type { SliderMarks, SliderProps };
