import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { Menu } from '@headlessui/react';
import { AergoSvg } from 'assets/images';
import styled from 'styled-components';

interface StyledFaCircleProps extends FontAwesomeIconProps {
  checked: boolean;
}

export const MenuItems = styled(Menu.Items)`
  width: 25rem;
  z-index: 1;
  position: absolute;
  left: 0;
  top: 100%;
  right: 0;
  background: ${(props) => props.theme.colors.background.default};
  border: 1px solid ${(props) => props.theme.colors.grey.grey1};
  box-shadow: 0px 14px 24px -6px rgba(106, 115, 125, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.large} 0;
  /* gap: 8px; */
`;

export const MenuItem = styled.span`
  /* padding-right: 5rem; */
  font-family: 'Outfit-Medium';
  color: ${(props) => props.theme.colors.grey.grey6};
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  white-space: nowrap;
`;

export const Bold = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.large};
  text-align: center;
  font-weight: 600;
`;

export const NetworkItemWrapper = styled.div`
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  height: 50px;
  &:hover {
    background-color: ${(props) => props.theme.colors.grey.grey1};
  }
  &:active {
    opacity: 0.5;
  }
`;

export const StyledFaCircle = styled(FontAwesomeIcon)<StyledFaCircleProps>`
  margin-left: 2rem;
  margin-right: ${(props) => props.theme.spacing.tiny1};
  color: ${(props) =>
    props.checked
      ? props.theme.colors.primary.main
      : props.theme.colors.grey.grey6};
`;

export const MenuNetworkLabel = styled.span`
  font-family: 'Outfit-Medium';
  color: ${(props) => props.theme.colors.grey.grey6};
  font-weight: 500;
  font-size: 16px;
`;

export const StyledAergoSvg = styled(AergoSvg)`
  margin-right: ${(props) => props.theme.spacing.small};
  width: 36px;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;
