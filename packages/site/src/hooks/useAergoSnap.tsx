import { GetKeysResponse } from 'types/response';
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
        dispatch(disableLoading());
      })
      .catch((err: any) => {
        dispatch(setWalletConnection(false));
        dispatch(disableLoading());
        //eslint -disable-next-line no-console
        console.log(err);
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
      // window.sessionStorage.setItem('pk', JSON.stringify(response));
      // return response;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
      dispatch(disableLoading());
    }
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
    sendTransaction,
  };
};
