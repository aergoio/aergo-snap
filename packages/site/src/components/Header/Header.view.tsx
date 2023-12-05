import { useTheme } from 'styled-components';
import { useState } from 'react';
import { useAppSelector } from 'hooks/redux';
import { PopIn } from 'ui/molecule';
import { AergoSnapLogo } from 'assets/images/AergoSnapLogo';
import { getThemePreference } from 'utils/theme';
import { Line } from 'ui/atom/Line';
import { DarkModeToggle } from './DarkModeToggle';
import {
  HeaderWrapper,
  LogoWrapper,
  AccountWrapper,
  AccountNameWrapper,
  AccountName,
  Right,
  StyledFaEllipsisV,
  Title,
} from './Header.style';
import { NetworkMenu } from './NetworkMenu';

export const HeaderView = ({
  handleToggleClick,
}: {
  handleToggleClick(): void;
}) => {
  const theme = useTheme();
  const { address } = useAppSelector((state) => state.wallet);
  const [accountModal, setAccountModal] = useState(false);
  const handleOptions = () => {
    console.log('handleOptions');
  };

  return (
    <div>
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
            <AccountNameWrapper onClick={() => setAccountModal(true)}>
              <AccountName>My Account</AccountName>
            </AccountNameWrapper>
          ) : null}
        </AccountWrapper>
        <Right>
          <NetworkMenu />
          <DarkModeToggle
            onToggle={handleToggleClick}
            defaultChecked={getThemePreference()}
          />
          <StyledFaEllipsisV
            icon={['fas', 'ellipsis-vertical']}
            onClick={handleOptions}
          />
        </Right>
      </HeaderWrapper>
      <Line />
    </div>
  );
};
