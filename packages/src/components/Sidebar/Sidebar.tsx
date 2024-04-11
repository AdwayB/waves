import { MouseEvent, useEffect, useState } from 'react';
import styles from './sidebar.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { Icon } from '../IconComponents';
import { Avatar } from '../Avatar';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCollapsed(window.innerWidth >= 1366 ? false : true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleNavigation = (e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget as HTMLDivElement;
    navigate(id === 'home' ? '/user' : `/user/${id}`);
    if (isMobile) {
      setCollapsed(true);
    }
  };

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
      <div className={styles.logo} id="home" onClick={handleNavigation}>
        {/* <span className={styles.logoText}>waves</span> */}
        <Icon type="logo" />
      </div>
      <div className={styles.navContainer}>
        <div className={styles.navItem} id="home" onClick={handleNavigation}>
          <HomeOutlinedIcon className={styles.navIcon} color="inherit" />
          <span className={styles.navText}>Home</span>
        </div>
        <div className={styles.navItem} id="browse-events" onClick={handleNavigation}>
          <TravelExploreOutlinedIcon className={styles.navIcon} color="inherit" />
          <span className={styles.navText}>Browse</span>
        </div>
        <div className={styles.navItem} id="saved-events" onClick={handleNavigation}>
          <BookmarksOutlinedIcon className={styles.navIcon} color="inherit" />
          <span className={styles.navText}>Saved</span>
        </div>
        <div className={styles.navItem} id="calendar" onClick={handleNavigation}>
          <CalendarTodayOutlinedIcon className={styles.navIcon} color="inherit" />
          <span className={styles.navText}>Calendar</span>
        </div>
        <div className={styles.navItem} id="my-events" onClick={handleNavigation}>
          <EditNoteOutlinedIcon className={styles.navIcon} color="inherit" />
          <span className={styles.navText}>My Events</span>
        </div>
      </div>
      <div className={styles.avatarContainer} id="my-profile" onClick={handleNavigation}>
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
