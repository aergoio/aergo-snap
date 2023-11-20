import { GetKeysResponse, Network } from 'types';
import {
  setAddress,
  setForceReconnect,
  setWalletConnection,
} from 'slices/walletSlice';
import {
  disableLoading,
  enableLoadingWithMessage,
  setError,
} from 'slices/UISlice';
import { setNetworks } from 'slices/networkSlice';
import { Networks } from 'utils/constants';
import { useAppDispatch, useAppSelector } from './redux';

export const useAergoSnap = () => {
  const snapId = process.env.REACT_APP_SNAP_ID
    ? process.env.REACT_APP_SNAP_ID
    : 'local:http://localhost:8080/';
  const snapVersion = process.env.REACT_APP_SNAP_VERSION
    ? process.env.REACT_APP_SNAP_VERSION
    : '*';
  const debugLevel = 'all';
  const defaultParam = {
    debugLevel,
  };

  const dispatch = useAppDispatch();
  const { provider, address } = useAppSelector((state) => state.wallet);
  const { activeNetwork } = useAppSelector((state) => state.networks);
  // const { loader } = useAppSelector((state) => state.UI);

  const connectToSnap = () => {
    dispatch(enableLoadingWithMessage('Connecting...'));
    provider
      .request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: { version: snapVersion },
        },
      })
      .then(() => {
        dispatch(setWalletConnection(true));
        dispatch(setForceReconnect(false));
        dispatch(disableLoading());
      })
      .catch(() => {
        dispatch(setWalletConnection(false));
        dispatch(disableLoading());
      });
  };

  const checkConnection = () => {
    dispatch(enableLoadingWithMessage('Connecting...'));
    provider
      .request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'ping',
            params: {
              ...defaultParam,
            },
          },
        },
      })
      .then((res: any) => {
        console.log('checkConnection', res === 'pong' ?? 'connected');
        dispatch(setWalletConnection(true));
        // ? I don't know whether to import network data through the snap background or from inside as a constant object.
        dispatch(setNetworks(Networks));
        dispatch(disableLoading());
      })
      .catch((err: any) => {
        dispatch(setWalletConnection(false));
        dispatch(disableLoading());
        //eslint -disable-next-line no-console
        console.log(err);
        dispatch(setError(err));
      });
  };

  const getKeys = async () => {
    dispatch(enableLoadingWithMessage('Getting... Address'));
    try {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { address } = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: { snapId, request: { method: 'get-keys' } },
      })) as GetKeysResponse;

      dispatch(setAddress(address));
      dispatch(disableLoading());
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
      dispatch(disableLoading());
    }
  };

  const getWalletData = async (chainId: string, networks?: Network[]) => {
    console.log(chainId, 'chainId');
  };

  const sendTransaction = async () => {
    try {
      const to = 'AmQ1kMNzQVnA49MYMrGCbpy2157dFpe4bRLXWStu3Q41CKbpyDF8';
      const amount = '10000000000';

      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'send-tx',
            params: { from: address, to, amount },
          },
        },
      });
      if (response) {
        console.log(response, 'response');
      }
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  return {
    connectToSnap,
    checkConnection,
    getKeys,
    getWalletData,
    sendTransaction,
  };
};
