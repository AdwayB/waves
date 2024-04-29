import { MouseEvent, useEffect, useState } from 'react';
import styles from './sidebar.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotesIcon from '@mui/icons-material/Notes';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { Icon } from '../IconComponents';
import { Avatar } from '../Avatar';
import { useNavigate } from 'react-router-dom';

enum SidebarElement {
  HOME = 'home',
  BROWSE = 'browse-events',
  SAVED = 'saved-events',
  CALENDAR = 'calendar',
  MY_EVENTS = 'my-events',
  MY_PROFILE = 'my-profile',
}

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [selectedElement, setSelectedElement] = useState<SidebarElement>(SidebarElement.HOME);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCollapsed(window.innerWidth >= 1366 ? false : true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget as HTMLDivElement;
    setSelectedElement(id as SidebarElement);
    navigate(id === 'home' ? '/user' : `/user/${id}`);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    console.log('====================================');
    console.log(selectedElement);
    console.log('====================================');
  }, [selectedElement]);

  const getClassName = () => {
    switch (collapsed) {
      case true:
        switch (isMobile) {
          case true:
            return styles.collapsedMobile;
          case false:
            return styles.collapsedDesktop;
          default:
            return styles.collapsedDesktop;
        }
      case false:
        switch (isMobile) {
          case true:
            return styles.sidebarMobile;
          case false:
            return '';
          default:
            return '';
        }
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.sidebar} ${getClassName()}`}>
      {true && (
        <div className={styles.hamburger} onClick={toggleCollapse}>
          {collapsed ? (
            <MenuIcon className={styles.hamburgerIcon} color="inherit" />
          ) : (
            <CloseOutlinedIcon className={styles.hamburgerIcon} />
          )}
        </div>
      )}
      <div className={styles.logo} id={SidebarElement.HOME} onClick={handleClick}>
        {/* <span className={styles.logoText}>waves</span> */}
        <div className={selectedElement === SidebarElement.HOME ? styles.logoHover : styles.logoIcon}>
          <Icon type="logo" />
        </div>
      </div>
      <div className={styles.navContainer}>
        <div className={styles.navItem} id={SidebarElement.HOME} onClick={handleClick}>
          {selectedElement === SidebarElement.HOME ? (
            <HomeIcon className={styles.selectedNavIcon} color="inherit" />
          ) : (
            <HomeOutlinedIcon className={styles.navIcon} color="inherit" />
          )}
          <span className={styles.navText}>Home</span>
        </div>
        <div className={styles.navItem} id={SidebarElement.BROWSE} onClick={handleClick}>
          <TravelExploreOutlinedIcon
            className={selectedElement === SidebarElement.BROWSE ? styles.selectedNavIcon : styles.navIcon}
            color="inherit"
          />
          <span className={styles.navText}>Browse</span>
        </div>
        <div className={styles.navItem} id={SidebarElement.SAVED} onClick={handleClick}>
          {selectedElement === SidebarElement.SAVED ? (
            <BookmarksIcon className={styles.selectedNavIcon} color="inherit" />
          ) : (
            <BookmarksOutlinedIcon className={styles.navIcon} color="inherit" />
          )}
          <span className={styles.navText}>Saved</span>
        </div>
        <div className={styles.navItem} id={SidebarElement.CALENDAR} onClick={handleClick}>
          {selectedElement === SidebarElement.CALENDAR ? (
            <CalendarMonthIcon className={styles.selectedNavIcon} color="inherit" />
          ) : (
            <CalendarTodayOutlinedIcon className={styles.navIcon} color="inherit" />
          )}
          <span className={styles.navText}>Calendar</span>
        </div>
        <div className={styles.navItem} id={SidebarElement.MY_EVENTS} onClick={handleClick}>
          {selectedElement === SidebarElement.MY_EVENTS ? (
            <EditNoteOutlinedIcon className={styles.selectedNavIcon} color="inherit" />
          ) : (
            <NotesIcon className={styles.navIcon} color="inherit" />
          )}
          <span className={styles.navText}>My Events</span>
        </div>
      </div>
      <div className={styles.avatarContainer} id={SidebarElement.MY_PROFILE} onClick={handleClick}>
        <Avatar name={'Test User'}>Test User</Avatar>
        <span className={styles.avatarLabel}>Test User</span>
      </div>
      <div className={styles.collapseArrowContainer} onClick={toggleCollapse}>
        <ChevronLeftOutlinedIcon className={styles.collapseArrow} color="inherit" />
      </div>
    </div>
  );
};

export { Sidebar };
