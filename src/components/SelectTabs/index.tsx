import React, { FC, ReactNode } from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import cn from 'classnames';

import 'react-tabs/style/react-tabs.css';
import styles from './styles.module.scss';

interface ISelectTabsProps {
  tabTitles: string[],
  tabContents?: ReactNode[],
  defaultActiveTab?: number,
  onSelect?: (n: number) => void,
}

export const SelectTabs: FC<ISelectTabsProps> = ({
  tabTitles,
  tabContents,
  defaultActiveTab,
  onSelect,
}) => (
  <Tabs
    defaultIndex={defaultActiveTab || 0}
    className={styles.tabs}
    onSelect={onSelect}
  >
    <TabList className={styles.tabs_titles}>
      {tabTitles.map((title, index) => (
        <Tab
          key={title}
          className={cn(styles.tabs_titles_title, {
            [styles.tabs_titles_title_active_forever]: defaultActiveTab === index,
          })}
          selectedClassName={cn({
            [styles.tabs_titles_title_active]: defaultActiveTab !== index,
          })}
        >
          {title}
        </Tab>
      ))}
    </TabList>

    {tabContents && tabContents.map((content) => (<TabPanel>{content}</TabPanel>))}
  </Tabs>
);
