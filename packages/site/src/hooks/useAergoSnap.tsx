/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { GetKeysResponse, Network } from 'types';
import {
  setAccount,
  setAddress,
  setForceReconnect,
  setTokens,
  setTransactions,
  setWalletConnection,
} from 'slices/walletSlice';
import {
  disableLoading,
  enableLoadingWithMessage,
  setError,
} from 'slices/UISlice';
import { setNetworks } from 'slices/networkSlice';
import { Networks } from 'utils/constants';
import { scanApi } from 'apis/scanApi';
import { formatTokenAmount } from 'utils/utils';
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
  const { provider, address, tokens } = useAppSelector((state) => state.wallet);
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
        dispatch(setWalletConnection(true));
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

  const getWalletData = async (network: Network) => {
    const scanApiInstance = await scanApi(network);
    if (scanApiInstance && address) {
      try {
        const account = (
          await scanApiInstance.get(`accountsBalance?q=_id:${address}`)
        ).data.hits[0];
        if (account) {
          // 1. account Balance, staking Balance bigInt to Aergo Amount
          // 2. USD Change Api
          account.meta.unstaked_balance = (
            BigInt(account?.meta?.balance) - BigInt(account?.meta?.staking)
          ).toString();

          account.meta.unstaked_balance_formatAmount = formatTokenAmount(
            account.meta.unstaked_balance,
            'AERGO',
            18,
          );

          account.meta.staking_formatAmount = formatTokenAmount(
            account.meta.staking,
            'AERGO',
            18,
          );
        }
        const transactions = (
          await scanApiInstance.get(
            `transactions/?q=(from:${address} OR to:${address})&size=10000&sort=ts:desc`,
          )
        ).data.hits;
        const getTokenBalances = (
          await scanApiInstance.get(`tokenBalance?q=${address}&size=10000`)
        ).data.hits;
        const chainIdLabel = `${network.chainId}/${network.label}`;
        if (getTokenBalances.length > 0) {
          // Update Token Balance
          const updatedTokens = tokens[chainIdLabel].map((token) => {
            const tokenBalance = getTokenBalances.find(
              (tokenBalance: any) => tokenBalance.token.hash === token.hash,
            );
            if (tokenBalance) {
              return { ...token, tokenBalance };
            }
            return token;
          });
          if (updatedTokens.length > 0) {
            dispatch(setTokens({ chainIdLabel, tokens: updatedTokens }));
          }
        }

        dispatch(setAccount(account));
        dispatch(setTransactions(transactions));
      } catch (err) {
        console.error(err);
        dispatch(setError(err));
      }
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
      dispatch(disableLoading());
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
