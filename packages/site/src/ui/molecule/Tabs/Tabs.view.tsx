import { Tab } from '@headlessui/react';
import { useState, ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
import {
  StyledTabsView,
  StyledTabList,
  StyledTab,
  StyledTabPanel,
  StyledTabBorder,
  StyledTabPanels
} from './Tabs.style';

type Props = {
  tabs: string[];
  panels?: ReactNode[];
  style?: CSSProperties;
};

export const TabsView = ({ tabs, panels, style }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <StyledTabsView style={style}>
      <Tab.Group
        manual
        selectedIndex={tabIndex}
        onChange={(idx) => setTabIndex(idx)}
      >
        <StyledTabList>
          {tabs.map((name, idx) => (
            <StyledTab key={`${name}${idx}`}>
              {name}
              <StyledTabBorder aria-selected={tabIndex === idx} />
            </StyledTab>
          ))}
        </StyledTabList>
        <StyledTabPanels>
          {panels?.map((panel, idx) => (
            <StyledTabPanel key={`${panel}${idx}`}>{panel}</StyledTabPanel>
          ))}
        </StyledTabPanels>
      </Tab.Group>
    </StyledTabsView>
  );
};
