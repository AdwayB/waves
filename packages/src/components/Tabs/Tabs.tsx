import { FC, ReactNode, SyntheticEvent, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Tabs as MTabs, Tab, useTheme } from '@mui/material';
import styles from './tabs.module.scss';

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

interface TabObject {
  tabTitle: ReactNode;
  tabContent: ReactNode;
}

interface TabsProps {
  tabs: TabObject[];
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div className={styles.tabPanel}>{children}</div>}
    </div>
  );
};

const Tabs: FC<TabsProps> = (props) => {
  const { tabs } = props;
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={styles.tabsContainer}>
      <MTabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth" className={styles.tabs}>
        {tabs.map((tab, index) => (
          <Tab className={styles.tabTitle} label={tab.tabTitle} key={index} />
        ))}
      </MTabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((tab, index) => (
          <TabPanel value={value} index={index} dir={theme.direction} key={index}>
            {tab.tabContent}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

export { TabPanel, Tabs };
export type { TabPanelProps, TabObject, TabsProps };
