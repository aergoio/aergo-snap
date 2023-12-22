import { useTheme } from 'styled-components';
import { MetaMaskFox, PoweredBy, MetaMask } from './MetamaskSvg';
import {
  FooterWrapper,
  PoweredByButton,
  PoweredByContainer
} from './Footer.style';
import { Button } from 'ui/atom/Button';
import { useAergoSnap } from 'apis/useAergoSnap';

export const FooterView = () => {
  const theme = useTheme();
  const { connectToSnap } = useAergoSnap();

  return (
    <FooterWrapper>
      <PoweredByButton href="https://docs.metamask.io/" target="_blank">
        <MetaMaskFox />
        <PoweredByContainer>
          <PoweredBy color={theme.colors.text.muted} />
          <MetaMask color={theme.colors.text.default} />
        </PoweredByContainer>
      </PoweredByButton>
      <Button variant="gradation" spacing="xlarge" onClick={connectToSnap}>
        Reconnect
      </Button>
    </FooterWrapper>
  );
};
