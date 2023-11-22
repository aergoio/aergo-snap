import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { Menu } from '@headlessui/react';
import styled from 'styled-components';

interface StyledFaCircleProps extends FontAwesomeIconProps {
  checked: boolean;
}

export const MenuItems = styled(Menu.Items)`
  z-index: 1;
  position: absolute;
  margin-top: 23rem;
  right: 0;
  background: ${(props) => props.theme.colors.background.default};
  border: 1px solid ${(props) => props.theme.colors.grey.grey1};
  box-shadow: 0px 14px 24px -6px rgba(106, 115, 125, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 8px 0px;
  gap: 8px;
`;

export const MenuItem = styled.span`
  padding-right: 5rem;
  white-space: nowrap;
`;

export const Bold = styled.div`
  text-align: center;
  font-weight: 600;
`;

export const NetworkItemWrapper = styled.div`
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey.grey1};
  }
  &:active {
    opacity: 0.5;
  }
`;

export const StyledFaCircle = styled(FontAwesomeIcon)<StyledFaCircleProps>`
  margin: ${(props) => props.theme.spacing.tiny1};
  color: ${(props) =>
    props.checked
      ? props.theme.colors.primary.main
      : props.theme.colors.grey.grey6};
`;
