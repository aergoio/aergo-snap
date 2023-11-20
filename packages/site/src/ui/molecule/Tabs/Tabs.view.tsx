import { Tab } from '@headlessui/react';
import { useState, ReactNode } from 'react';
import {
  StyledTabsView,
  StyledTabList,
  StyledTab,
  StyledTabPanel,
  StyledTabBorder,
} from './Tabs.style';

type Props = {
  tabs: string[];
  panels?: ReactNode[];
};

export const TabsView = ({ tabs, panels }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <StyledTabsView>
      <Tab.Group
        manual
        selectedIndex={tabIndex}
        onChange={(idx) => setTabIndex(idx)}
      >
        <StyledTabList>
          {tabs.map((name, idx) => (
            <StyledTab>
              {name}
              <StyledTabBorder aria-selected={tabIndex === idx} />
            </StyledTab>
          ))}
        </StyledTabList>
        <Tab.Panels>
          {panels?.map((panel) => (
            <StyledTabPanel>{panel}</StyledTabPanel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </StyledTabsView>
  );
};