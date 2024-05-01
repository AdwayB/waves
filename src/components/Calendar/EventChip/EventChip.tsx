import { useState, useRef, FC } from 'react';
import { gsap } from 'gsap';
import styles from './eventChip.module.scss';

interface EventChipProps {
  isPrimary: boolean;
  primaryHighlightColor?: string;
  secondaryHighlightColor?: string;
}

const EventChip: FC<EventChipProps> = (props) => {
  const { isPrimary, primaryHighlightColor, secondaryHighlightColor } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const chipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    gsap.to(chipRef.current, {
      scale: 1.5,
      duration: 0.1,
      ease: 'power2.inOut',
    });
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    gsap.to(chipRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  const getChipClassName = () => {
    switch (true) {
      case isPrimary && isExpanded:
        return `${styles.chip} ${styles.primary} ${styles.expanded}`;
      case isPrimary && !isExpanded:
        return `${styles.chip} ${styles.primary}`;
      case !isPrimary && isExpanded:
        return `${styles.chip} ${styles.secondary} ${styles.expanded}`;
      case !isPrimary && !isExpanded:
        return `${styles.chip} ${styles.secondary}`;
      default:
        return `${styles.chip} ${styles.secondary}`;
    }
  };

  const getBackgroundStyle = () => {
    const bgColor = isPrimary ? primaryHighlightColor : secondaryHighlightColor;
    if (bgColor) {
      return { backgroundColor: bgColor };
    }
    return {};
  };

  return (
    <div
      ref={chipRef}
      className={getChipClassName()}
      style={getBackgroundStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export { EventChip };
export type { EventChipProps };
