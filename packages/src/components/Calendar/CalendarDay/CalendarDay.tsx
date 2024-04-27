import { useState, useRef, FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { gsap } from 'gsap';
import styles from './calendarDay.module.scss';
import { EventChip } from '../EventChip/EventChip';
import { DateHighlight } from '../types';

interface CalendarDayProps {
  date: Dayjs | null;
  currentDate: Dayjs;
  selectedDate: Dayjs | null;
  primaryHighlights?: DateHighlight[];
  secondaryHighlights?: DateHighlight[];
  primaryHighlightColor?: string;
  secondaryHighlightColor?: string;
  onDateChange?: (date: Dayjs) => void;
}

const CalendarDay: FC<CalendarDayProps> = (props) => {
  const {
    date,
    currentDate,
    selectedDate,
    primaryHighlights,
    secondaryHighlights,
    primaryHighlightColor,
    secondaryHighlightColor,
    onDateChange,
  } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dateRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    gsap.to(dateRef.current, {
      scale: 1.3,
      duration: 0.1,
      ease: 'power2.inOut',
    });
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    gsap.to(dateRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.inOut',
    });
  };

  const handleDateClick = () => {
    onDateChange && onDateChange(date ?? dayjs());
  };

  const getDate = (): number | null => date && date.date();
  const isCurrentDate = (): boolean => (getDate() ? getDate() === currentDate.date() : false);
  const isSelectedDate = (): boolean => (getDate() ? getDate() === selectedDate?.date() : false);

  const hexColorRegex = /#[a-fA-F0-9]{6}/ || /#[a-fA-F0-9]{3}/;
  const getHighlightColor = (primary: boolean = true): string | undefined => {
    if (primary) {
      if (primaryHighlightColor && primaryHighlightColor.match(hexColorRegex)) {
        return primaryHighlightColor;
      }
    } else if (secondaryHighlightColor && secondaryHighlightColor.match(hexColorRegex)) {
      return secondaryHighlightColor;
    }
  };

  const getDateClassName = () => {
    const groupedClassName = `${styles.calendarDate}`;
    if (isExpanded) {
      groupedClassName.concat(` ${styles.expanded}`);
    }
    return groupedClassName;
  };

  const getPrimaryHighlights = () => {
    const mapArray = [];
    var number = primaryHighlights && primaryHighlights.find((highlight) => highlight.date.date() === getDate())?.count;

    while (number && number > 0) {
      mapArray.push(1);
      number--;
    }
    return mapArray;
  };

  const getSecondaryHighlights = () => {
    const mapArray = [];
    var number =
      secondaryHighlights && secondaryHighlights.find((highlight) => highlight.date.date() === getDate())?.count;

    while (number && number > 0) {
      mapArray.push(1);
      number--;
    }
    return mapArray;
  };

  return (
    <div
      ref={dateRef}
      className={getDateClassName()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleDateClick}
    >
      <div
        className={`${styles.dateHeader} ${isCurrentDate() && styles.currentDate} ${isSelectedDate() && styles.selectedDate}`}
      >
        <span className={styles.dateNumber}>{getDate()}</span>
        {(getPrimaryHighlights().length > 0 || getSecondaryHighlights().length > 0) && (
          <div className={styles.dateEventsChipsContainer}>
            {getPrimaryHighlights().map((item, index) => (
              <EventChip
                key={`primary-${item}-${index}`}
                isPrimary={true}
                primaryHighlightColor={getHighlightColor()}
              />
            ))}
            {getSecondaryHighlights().map((item, index) => (
              <EventChip
                key={`secondary${item}-${index}`}
                isPrimary={false}
                secondaryHighlightColor={getHighlightColor(false)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { CalendarDay };
export type { CalendarDayProps };
