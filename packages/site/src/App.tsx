import {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { LoadingBackdrop, PopIn } from 'ui/molecule';
import { NoMetamaskModal, ConnectModal } from 'ui/organism';
import { GlobalStyle } from 'theme/default';
import {
  disableLoading,
  enableLoadingWithMessage,
  setSelectedToken
} from 'slices/UISlice';
import { ToggleThemeContext } from './Root';
import { useAppDispatch, useAppSelector, useHasMetamask } from './hooks';
import { useAergoSnap } from 'apis/useAergoSnap';
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
  overflow-y: hidden;
`;

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const { connected, forceReconnect, provider, address, tokens } =
    useAppSelector((state) => state.wallet);
  const networks = useAppSelector((state) => state.networks);
  const { loader, selectedToken } = useAppSelector((state) => state.UI);
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
      const network = networks.items[networks.activeNetwork];
      checkConnection(network);
    }
  }, [connected, forceReconnect, hasMetamask, provider]);

  useEffect(() => {
    dispatch(enableLoadingWithMessage('Getting Network Data...'));
    const getWalletDataWhenNetworkChange = async () => {
      try {
        const network = networks.items[networks.activeNetwork];
        await checkConnection(network);
        await getWalletData(network, address);
      } catch (e) {
        console.error(e);
      }
    };
    if (address) {
      getWalletDataWhenNetworkChange();
    }
    dispatch(disableLoading());
  }, [networks.activeNetwork, provider, address]);

  useEffect(() => {
    const getWalletDataWhenTokenChange = async () => {
      try {
        const network = networks.items[networks.activeNetwork];
        await getWalletData(
          network,
          address,
          selectedToken !== 'AERGO' ? selectedToken.hash : null
        );
      } catch (e) {
        console.error(e);
      }
    };
    if (address) {
      getWalletDataWhenTokenChange();
    }
  }, [networks.activeNetwork, selectedToken]);

  useEffect(() => {
    const getWalletDataIntervalEvery10Seconds = setInterval(() => {
      if (provider && networks.items.length > 0 && address) {
        const network = networks.items[networks.activeNetwork];
        getWalletData(
          network,
          address,
          selectedToken !== 'AERGO' ? selectedToken.hash : null
        );
      }
    }, 10000) as any;

    return () => clearInterval(getWalletDataIntervalEvery10Seconds);
  }, [networks.activeNetwork, provider, address, tokens, selectedToken]);

  useEffect(() => {
    dispatch(setSelectedToken('AERGO'));
  }, []);

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
