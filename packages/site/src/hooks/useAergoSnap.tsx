/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { GetKeysResponse, Network } from 'types';
import {
  setAccountBalance,
  setAddress,
  setForceReconnect,
  setTokens,
  setTransactions,
  setWalletConnection
} from 'slices/walletSlice';
import {
  disableLoading,
  enableLoadingWithMessage,
  setError
} from 'slices/UISlice';
import { setNetworks } from 'slices/networkSlice';
import { Networks } from 'utils/constants';
import { scanApi } from 'apis/scanApi';
import { useAppDispatch, useAppSelector } from './redux';
import { resetWallet } from 'slices/walletSlice';

export const useAergoSnap = () => {
  const snapId = process.env.REACT_APP_SNAP_ID
    ? process.env.REACT_APP_SNAP_ID
    : 'local:http://localhost:8080/';
  const snapVersion = process.env.REACT_APP_SNAP_VERSION
    ? process.env.REACT_APP_SNAP_VERSION
    : '*';

  const dispatch = useAppDispatch();
  const { provider, tokens } = useAppSelector((state) => state.wallet);
  const connectToSnap = () => {
    dispatch(enableLoadingWithMessage('Connecting...'));
    //* Set Public Networks: Constants objects
    dispatch(setNetworks(Networks));
    provider
      .request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: { version: snapVersion }
        }
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

  const getKeys = async () => {
    dispatch(enableLoadingWithMessage('Getting... Address'));
    try {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const address = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: { snapId, request: { method: 'getAddress' } }
      })) as GetKeysResponse;
      console.log(address, 'getKeys');
      dispatch(setAddress(address));
      dispatch(disableLoading());
    } catch (err) {
      // console.error(err);
      dispatch(setError(err));
      dispatch(disableLoading());
    }
  };

  const checkConnection = async (network: Network) => {
    dispatch(enableLoadingWithMessage('Connecting to Web3'));
    try {
      const connectToWeb3 = JSON.parse(
        await provider.request({
          method: 'wallet_invokeSnap',
          params: {
            snapId,
            request: {
              method: 'ping',
              params: {
                node: network.web3Url
              }
            }
          }
        })
      );
      if (connectToWeb3.url === 'undefined') {
        //* Not Found Web3 Url, Error Notification
        dispatch(resetWallet());
        console.log('Not founded web3');
      }
      console.log(`Connected Web3 Url: ${connectToWeb3.url}`);
      dispatch(setWalletConnection(true));
      dispatch(disableLoading());
    } catch (err) {
      dispatch(setWalletConnection(false));
      dispatch(disableLoading());
      dispatch(setError(err));
    }
  };

  const getWalletData = async (
    network: Network,
    address: string,
    tokenHash?: string
  ) => {
    const { balance } = (await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: { method: 'getBalance', params: { account: address } }
      }
    })) as any;
    if (balance) {
      dispatch(setAccountBalance(balance));
    }

    const scanApiInstance = await scanApi(network);

    if (scanApiInstance && address) {
      try {
        let transactions;

        if (tokenHash) {
          const getTransactionsWithReceipt = await Promise.all(
            (
              await scanApiInstance.get(
                `tokenTransfers?q=(from:${address} OR to:${address}) AND address:${tokenHash}&size=10000&sort=ts:desc`
              )
            ).data.hits.map(async (transaction: any) => {
              const hash = transaction.hash.slice(0, -2) as string;
              const receipt = (
                await scanApiInstance.get(`Transactions?q=_id:${hash}`)
              ).data.hits[0];

              return { ...transaction, receipt };
            })
          );
          transactions = getTransactionsWithReceipt;
        } else {
          transactions = (
            await scanApiInstance.get(
              `transactions/?q=(from:${address} OR to:${address})&size=10000&sort=ts:desc`
            )
          ).data.hits;
        }

        const getTokenBalances = (
          await scanApiInstance.get(`tokenBalance?q=${address}&size=10000`)
        ).data.hits;

        const chainIdLabel = `${network.chainId}/${network.label}`;

        if (getTokenBalances.length > 0) {
          // Update Token Balance
          const updatedTokens = tokens[chainIdLabel].map((token: any) => {
            const tokenBalance = getTokenBalances.find(
              (tokenBalance: any) => tokenBalance.token.hash === token.hash
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

        dispatch(setTransactions(transactions));
      } catch (err) {
        console.error('Error in getWalletData:', err);
        dispatch(setError(err));
      }
    }
  };

  const sendTransaction = async (
    from: string,
    to: string,
    amount: string,
    type: number,
    payloadJson?: any
  ) => {
    try {
      const getBlockNumber = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: { snapId, request: { method: 'getBlockNumber' } }
      })) as any;

      const account = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getState', params: { account: from } }
        }
      })) as any;

      const txResult = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'sendTransaction',
            params: {
              from,
              to,
              amount,
              type,
              nonce: account.nonce + 1,
              chainIdHash: getBlockNumber.chainIdHash,
              payloadJson
            }
          }
        }
      })) as any;
      if (txResult) {
        console.log(txResult, 'Transaction Success');
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
    sendTransaction
  };
};
