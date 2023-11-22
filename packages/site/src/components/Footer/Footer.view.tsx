import { useTheme } from 'styled-components';
import { MetaMaskFox, PoweredBy, MetaMask } from './MetamaskSvg';
import {
  FooterWrapper,
  PoweredByButton,
  PoweredByContainer,
} from './Footer.style';

export const FooterView = () => {
  const theme = useTheme();

  return (
    <FooterWrapper>
      <PoweredByButton href="https://docs.metamask.io/" target="_blank">
        <MetaMaskFox />
        <PoweredByContainer>
          <PoweredBy color={theme.colors.text.muted} />
          <MetaMask color={theme.colors.text.default} />
        </PoweredByContainer>
      </PoweredByButton>
    </FooterWrapper>
  );
};
