import styled, { useTheme } from 'styled-components';
import { getThemePreference } from '../utils';
import { ReactComponent as OptionsSvg } from '../assets/options-vertical.svg';
import { ReactComponent as ArrowDownSvg } from '../assets/arrow-down.svg';
import { SnapLogo } from './SnapLogo';
import { Toggle } from './Toggle';

const HeaderWrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  place-items: center;
  padding: 2.4rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.default};
`;

const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.title};
  white-space: nowrap;
  font-weight: bold;
  margin: 0;
  margin-left: 1.2rem;
  cursor: default;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MiddleContainer = styled.div`
  width: 80%;
  text-align: center;
`;

const AccountName = styled.div`
  padding: 1rem 0;
  border-radius: 0.5rem;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.background.transparent};
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NetworkName = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.colors.background.transparent};
  }
`;

const OptionsVertical = styled(OptionsSvg)`
  cursor: pointer;
  padding: 1rem;
  border-radius: 50%;
  &:hover {
    background: ${(props) => props.theme.colors.background.transparent};
  }
  path {
    fill: ${(props) => props.theme.colors.icon.default};
  }
`;

const ArrowDown = styled(ArrowDownSvg)`
  margin-left: 0.5rem;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
  path {
    fill: ${(props) => props.theme.colors.icon.default};
  }
`;

export const Header = ({
  handleToggleClick,
}: {
  handleToggleClick(): void;
}) => {
  const theme = useTheme();

  const handleAccountModal = () => {
    console.log('handleAccountModal');
  };

  const handleNetworkModal = () => {
    console.log('handleNetworkModal');
  };

  const handleOptions = () => {
    console.log('handleOptions');
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <SnapLogo color={theme.colors.icon.default} size={36} />
        <Title>Aergo Snap</Title>
      </LogoWrapper>
      <MiddleContainer onClick={handleAccountModal}>
        <AccountName>
          Account1
          <ArrowDown />
        </AccountName>
      </MiddleContainer>

      <RightContainer>
        <NetworkName onClick={handleNetworkModal}>
          Aergo Mainnet
          <ArrowDown />
        </NetworkName>
        <Toggle
          onToggle={handleToggleClick}
          defaultChecked={getThemePreference()}
        />
        <OptionsVertical onClick={handleOptions} />
      </RightContainer>
    </HeaderWrapper>
  );
};
