import { CSSProperties, FC, ReactElement } from 'react';
import { Tooltip as MTooltip, tooltipClasses, Zoom } from '@mui/material';
import styles from './tooltip.module.scss';

interface TooltipProps {
  text?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  followCursor?: boolean;
  style?: CSSProperties;
  children: ReactElement;
}

/**
 * A custom tooltip component.
 * Can follow the cursor over the wrapped element.
 *
 * @param {TooltipProps} props - The props for the tooltip component.
 */
const Tooltip: FC<TooltipProps> = (props) => {
  const { text = '', placement = 'top', followCursor = false, style = {}, children } = props;

  return (
    <div className={styles.tooltipWrapper} style={style}>
      <MTooltip
        title={text}
        placement={placement}
        followCursor={followCursor}
        TransitionComponent={Zoom}
        arrow
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
                marginTop: '10px',
              },
              [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
                marginBottom: '10px',
              },
              [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
                marginLeft: '10px',
              },
              [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
                marginRight: '10px',
              },
            },
          },
        }}
      >
        {children}
      </MTooltip>
    </div>
  );
};

export { Tooltip };
export type { TooltipProps };
