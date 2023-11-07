import { FunctionComponent, ReactNode, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from './hooks/redux';
import { GlobalStyle } from './config/theme';
import { ToggleThemeContext } from './Root';
import { Footer } from './components';

import { LoadingBackdrop, PopIn } from './components/molecule';
import { useHasMetamask } from './hooks/useHasMetamask';
import { useAergoSnap } from './hooks/useAergoSnap';
import { NoMetamaskModal, ConnectModal, Header } from './components/organism';

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
