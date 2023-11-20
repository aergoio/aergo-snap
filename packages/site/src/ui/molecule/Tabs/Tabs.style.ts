import styled from 'styled-components';
import { Tab } from '@headlessui/react';

export const StyledTabsView = styled.div`
  margin-top: ${(props) => props.theme.spacing.tiny1};
  width: 100%;
`;

export const StyledTabList = styled(Tab.List)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTab = styled(Tab)`
  width: 26vw;
  padding: 8px 16px;
  cursor: pointer;

  color: ${(props) => props.theme.colors.text.default};
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  background-color: transparent;

  :hover {
    opacity: 0.7;
  }

  &[aria-selected='true'] {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

export const StyledTabBorder = styled.div`
  margin-top: ${(props) => props.theme.spacing.tiny2};
  &[aria-selected='true'] {
    border: 1px solid ${(props) => props.theme.colors.primary.main};
  }
`;

export const StyledTabPanel = styled(Tab.Panel)`
  padding: 16px;
`;
