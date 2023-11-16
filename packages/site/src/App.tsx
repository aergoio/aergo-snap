import { FunctionComponent, ReactNode, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LoadingBackdrop, PopIn } from 'ui/molecule';
import { NoMetamaskModal, ConnectModal, Header, Footer } from 'ui/organism';
import { GlobalStyle } from 'theme/default';
import { ToggleThemeContext } from './Root';
import { useAergoSnap, useAppSelector, useHasMetamask } from './hooks';

library.add(fas);

import { useAergoSnap, useHasMetamask } from './hooks';

library.add(fas);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const { connected, forceReconnect, provider } = useAppSelector(
    (state) => state.wallet,
  );
  const { loader } = useAppSelector((state) => state.UI);
  const toggleTheme = useContext(ToggleThemeContext);
  const { hasMetamask } = useHasMetamask();
  const { checkConnection, getKeys } = useAergoSnap();
  useEffect(() => {
    if (!provider) {
      return;
    }

    if (connected) {
      getKeys();
    }

    if (hasMetamask && !connected && !forceReconnect) {
      checkConnection();
    }
  }, [connected, forceReconnect, hasMetamask, provider]);

  const loading = loader.isLoading;

  return (
    <>
      <GlobalStyle />
      <PopIn isOpen={!loading && Boolean(!hasMetamask) && !connected}>
        <NoMetamaskModal />
      </PopIn>
      <PopIn isOpen={!loading && Boolean(hasMetamask) && !connected}>
        <ConnectModal />
      </PopIn>
      <Wrapper>
        <PopIn isOpen={loading}>
          {loading && (
            <LoadingBackdrop>{loader.loadingMessage}</LoadingBackdrop>
          )}
        </PopIn>
        <Header handleToggleClick={toggleTheme} />
        {children}
        <Footer />
        <PopIn isOpen={loading}>
          {loading && (
            <LoadingBackdrop>{loader.loadingMessage}</LoadingBackdrop>
          )}
        </PopIn>
      </Wrapper>
    </>
  );
};
