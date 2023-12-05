import { FunctionComponent, ReactNode, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { LoadingBackdrop, PopIn } from 'ui/molecule';
import { NoMetamaskModal, ConnectModal } from 'ui/organism';
import { GlobalStyle } from 'theme/default';
import { disableLoading, enableLoadingWithMessage } from 'slices/UISlice';
import { ToggleThemeContext } from './Root';
import {
  useAergoSnap,
  useAppDispatch,
  useAppSelector,
  useHasMetamask,
} from './hooks';
import { Footer, Header } from './components';

library.add(fas);
library.add(far);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const { connected, forceReconnect, provider, address, tokens } =
    useAppSelector((state) => state.wallet);
  const networks = useAppSelector((state) => state.networks);
  const { loader } = useAppSelector((state) => state.UI);
  const toggleTheme = useContext(ToggleThemeContext);
  const { hasMetamask } = useHasMetamask();
  const { checkConnection, getKeys, getWalletData } = useAergoSnap();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const getWalletDataWhenNetworkChange = async () => {
      try {
        const network = networks.items[networks.activeNetwork];
        dispatch(enableLoadingWithMessage('Getting Network Data...'));
        await getWalletData(network);
        dispatch(disableLoading());
      } catch (e) {
        console.error(e);
      }
    };
    getWalletDataWhenNetworkChange();
  }, [networks.activeNetwork, provider, address]);

  useEffect(() => {
    const getWalletDataIntervalEvery10Seconds = setInterval(() => {
      if (provider && networks.items.length > 0 && address) {
        const network = networks.items[networks.activeNetwork];
        getWalletData(network);
      }
    }, 10000);

    return () => clearInterval(getWalletDataIntervalEvery10Seconds);
  }, [networks.activeNetwork, provider, address, tokens]);

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
