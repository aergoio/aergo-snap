import { useTheme } from 'styled-components';
import { useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { PopIn } from '@ui/molecule';
import { SnapLogo } from 'components/SnapLogo';
import { Toggle } from 'components/Toggle';
import { getThemePreference } from 'utils/theme';
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
  const { address } = useAppSelector((state) => state.wallet);
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
      <AccountWrapper>
        <PopIn isOpen={accountModal} setIsOpen={setAccountModal}></PopIn>
        {address ? (
          <AccountName onClick={() => setAccountModal(true)}>
            My Account
            <StyledFaChevronDown icon={['fas', 'chevron-down']} />
          </AccountName>
        ) : null}
      </AccountWrapper>
      <NetworkWrapper>
        <PopIn isOpen={networkModal} setIsOpen={setNetworkModal}></PopIn>
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
