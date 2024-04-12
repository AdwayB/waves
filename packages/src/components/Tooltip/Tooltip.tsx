import { FC, ReactElement } from 'react';
import { Tooltip as MTooltip, tooltipClasses, Zoom } from '@mui/material';
import styles from './tooltip.module.scss';

interface TooltipProps {
  text?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  followCursor?: boolean;
  children: ReactElement;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { text = '', placement = 'top', followCursor = false, children } = props;

  return (
    <div className={styles.tooltipWrapper}>
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
