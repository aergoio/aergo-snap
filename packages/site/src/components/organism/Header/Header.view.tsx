import { useTheme } from 'styled-components';
import { useState } from 'react';
import { getThemePreference } from '../../../utils';
import { SnapLogo } from '../../SnapLogo';
import { Toggle } from '../../Toggle';
import { PopIn } from '../../molecule/PopIn';
import {
  HeaderWrapper,
  LogoWrapper,
  AccountWrapper,
  AccountName,
  NetworkWrapper,
  NetworkName,
  StyledFaChevronDown,
  StyledFaEllipsisV,
  Title,
} from './Header.style';

export const HeaderView = ({
  handleToggleClick,
}: {
  handleToggleClick(): void;
}) => {
  const theme = useTheme();
  const [accountModal, setAccountModal] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);

  const handleOptions = () => {
    console.log('handleOptions');
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <SnapLogo color={theme.colors.icon.default} size={36} />
        <Title>Aergo Snap</Title>
      </LogoWrapper>
      <AccountWrapper onClick={() => setAccountModal(true)}>
        <PopIn
          isOpen={accountModal}
          setIsOpen={setAccountModal}
          showClose={false}
        ></PopIn>
        <AccountName>
          Account1
          <StyledFaChevronDown icon={['fas', 'chevron-down']} />
        </AccountName>
      </AccountWrapper>
      <NetworkWrapper>
        <PopIn
          isOpen={networkModal}
          setIsOpen={setNetworkModal}
          showClose={false}
        ></PopIn>
        <NetworkName onClick={() => setNetworkModal(true)}>
          Aergo Mainnet
          <StyledFaChevronDown icon={['fas', 'chevron-down']} />
        </NetworkName>
        <Toggle
          onToggle={handleToggleClick}
          defaultChecked={getThemePreference()}
        />
        <StyledFaEllipsisV
          icon={['fas', 'ellipsis-vertical']}
          onClick={handleOptions}
        />
      </NetworkWrapper>
    </HeaderWrapper>
  );
};
