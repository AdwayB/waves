import { FC, ReactNode } from 'react';
import { Menu as MMenu, MenuItem as MMenuItem, IconButton } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Colors } from '../../helpers/Colors';

interface MenuItem {
  label?: ReactNode;
  onClick?: (id?: string | number) => void;
  divider?: boolean;
}

interface MenuProps {
  type?: 'primary' | 'secondary';
  items: MenuItem[];
}

const Menu: FC<MenuProps> = (props) => {
  const { type = 'primary', items } = props;

  const getSX = () => {
    switch (type) {
      case 'primary':
        return {
          '& .MuiPaper-root': {
            background: 'transparent',
          },
          '& .MuiMenuItem-root': {
            color: Colors.actualWhite,
            '&:hover': {
              background: Colors.wavesViolet,
              color: Colors.actualWhite,
            },
          },
          '& .Mui-selected': {
            background: `${Colors.wavesViolet} !important`,
            color: `${Colors.actualWhite} !important`,
          },
          '& .MuiMenu-list': {
            background: Colors.wavesDarkViolet,
          },
        };
      case 'secondary':
        return {
          '& .MuiPaper-root': {
            background: 'transparent',
          },
          '& .MuiMenuItem-root': {
            color: Colors.actualWhite,
            '&:hover': {
              background: Colors.wavesPurple,
              color: Colors.actualWhite,
            },
          },
          '& .Mui-selected': {
            background: `${Colors.wavesPurple} !important`,
            color: `${Colors.actualWhite} !important`,
          },
          '& .MuiMenu-list': {
            background: Colors.menuBGSecondary,
          },
        };
    }
  };

  const handleClick = (popupState: any, onClick?: () => void) => {
    return () => {
      if (onClick) {
        onClick();
        popupState.close();
      } else {
        popupState.close();
      }
    };
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            sx={{
              color: type === 'primary' ? Colors.white : Colors.menuBGSecondary,
              '&:hover': {
                backgroundColor: type === 'primary' ? Colors.menuBGPrimaryHover : Colors.menuBGSecondaryHover,
              },
            }}
            {...bindTrigger(popupState)}
          >
            <MoreVertIcon />
          </IconButton>
          <MMenu {...bindMenu(popupState)} sx={getSX()}>
            {items.map((item, index) => (
              <MMenuItem key={index} onClick={handleClick(popupState, item.onClick)} divider={item.divider}>
                {item.label}
              </MMenuItem>
            ))}
          </MMenu>
        </>
      )}
    </PopupState>
  );
};

// EXAMPLE USAGE
//  <Menu
//    items={[
//      { label: 'Open Alert', onClick: () => setShow(true) },
//      { label: 'Close Alert', onClick: () => setShow(false) },
//    ]}
//  />;

export { Menu, MenuProps, MenuItem };
