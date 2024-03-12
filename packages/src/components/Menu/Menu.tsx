import { FC, ReactNode } from 'react';
import { Menu as MMenu, MenuItem as MMenuItem, IconButton } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface MenuItem {
  label?: ReactNode;
  onClick?: () => void;
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
          '& .MuiMenuItem-root': {
            color: 'white',
            '&:hover': {
              background: '#430694',
              color: 'white',
            },
          },
          '& .Mui-selected': {
            background: '#430694 !important',
            color: 'white !important',
          },
          '& .MuiMenu-list': {
            background: '#120249',
          },
        };
      case 'secondary':
        return {
          '& .MuiMenuItem-root': {
            color: 'white',
            '&:hover': {
              background: '#9d5ad7',
              color: 'white',
            },
          },
          '& .Mui-selected': {
            background: '#9d5ad7 !important',
            color: 'white !important',
          },
          '& .MuiMenu-list': {
            background: '#8142d3',
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
              color: type === 'primary' ? '#120249' : '#8142d3',
              '&:hover': {
                backgroundColor: type === 'primary' ? '#43069477' : '#8142d344',
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

export { Menu, MenuProps };
