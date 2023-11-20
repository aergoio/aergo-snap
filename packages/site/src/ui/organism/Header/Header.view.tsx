import { useTheme } from 'styled-components';
import { useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { PopIn } from 'ui/molecule';
import { AergoSnapLogo } from 'assets/images/AergoSnapLogo';
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
  const networks = useAppSelector((state) => state.networks);
  const [accountModal, setAccountModal] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);

  const handleOptions = () => {
    console.log('handleOptions');
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <AergoSnapLogo color={theme.colors.icon.default} size={36} />
        <Title>Aergo Snap</Title>
      </LogoWrapper>
      <AccountWrapper>
        <PopIn isOpen={accountModal} setIsOpen={setAccountModal}>
          <div>accountModal</div>
        </PopIn>
        {address ? (
          <AccountName onClick={() => setAccountModal(true)}>
            My Account
            <StyledFaChevronDown icon={['fas', 'chevron-down']} />
          </AccountName>
        ) : null}
      </AccountWrapper>
      <NetworkWrapper>
        <PopIn isOpen={networkModal} setIsOpen={setNetworkModal}>
          <div>
            <ul>
              {networks?.items.map((network) => (
                <li>{network.label}</li>
              ))}
            </ul>
          </div>
        </PopIn>
        <NetworkName onClick={() => setNetworkModal(true)}>
          {`Aergo ${networks?.items[networks.activeNetwork].label}`}
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
