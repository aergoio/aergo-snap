/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { GetKeysResponse, Network, NodeResponse } from 'types';
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
        params: { snapId, request: { method: 'getAddress' } },
      })) as GetKeysResponse;

      console.log('address', address);
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

  const setNode = async (node: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: { snapId, request: { method: 'setNode', params: { node } } },
      })) as NodeResponse;

      console.log('setNode', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getNode = async () => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: { snapId, request: { method: 'getNode' } },
      })) as NodeResponse;

      console.log('getNode', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getState = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getState', params: { account: address } },
        },
      })) as any;

      console.log('getState', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getProof = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getProof', params: { account: address } },
        },
      })) as any;

      console.log('getProof', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getNameInfo = async (name: string, number: number) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getNameInfo', params: { name, number } },
        },
      })) as any;

      console.log('getNameInfo', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBalance = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getBalance', params: { account: address } },
        },
      })) as any;

      console.log('getBalance', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlock = async (value: string | number) => {
    try {
      const params: { hash?: string; number?: number } = {};
      if (typeof value === 'string') {
        params.hash = value;
      } else if (typeof value === 'number') {
        params.number = value;
      }

      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getBlock', params },
        },
      })) as any;

      console.log('getBlock', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlockNumber = async () => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getBlockNumber' },
        },
      })) as any;

      console.log('getBlockNumber', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlockBody = async (
    value: string | number,
    offset: number = 0,
    size: number = 10,
  ) => {
    const params: {
      hash?: string;
      number?: number;
      offset: number;
      size: number;
    } = {
      offset,
      size,
    };

    if (typeof value === 'string') params.hash = value;
    if (typeof value === 'number') params.number = value;

    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getBlockBody', params },
        },
      })) as any;

      console.log('getBlockBody', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const listBlockHeaders = async (
    height: number,
    offset: number = 0,
    size: number = 10,
    asc: boolean = true,
  ) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'listBlockHeaders',
            params: {
              height,
              offset,
              size,
              asc,
            },
          },
        },
      })) as any;

      console.log('listBlockHeaders', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlockMetadata = async (value: string | number) => {
    try {
      const params: { hash?: string; number?: number } = {};
      if (typeof value === 'string') {
        params.hash = value;
      } else if (typeof value === 'number') {
        params.number = value;
      }

      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getBlockMetadata',
            params,
          },
        },
      })) as any;

      console.log('getBlockMetadata', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getTransaction = async (hash: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getTransaction',
            params: { hash },
          },
        },
      })) as any;

      console.log('getTransaction', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getTransactionReceipt = async (hash: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getTransactionReceipt',
            params: { hash },
          },
        },
      })) as any;

      console.log('getTransactionReceipt', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlockTransactionReceipts = async (value: string | number) => {
    try {
      const params: { hash?: string; number?: number } = {};
      if (typeof value === 'string') {
        params.hash = value;
      } else if (typeof value === 'number') {
        params.number = value;
      }

      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getBlockTransactionReceipts',
            params,
          },
        },
      })) as any;

      console.log('getBlockTransactionReceipts', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlockTX = async (hash: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getBlockTX',
            params: { hash },
          },
        },
      })) as any;

      console.log('getBlockTX', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const call = async (address: string, name: string, query: string[] = []) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'call',
            params: { address, name, query },
          },
        },
      })) as any;

      console.log('call', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getPastEvents = async (
    address: string,
    eventName: string,
    argFilter: string,
    range: number | { blockfrom?: number; blockto?: number },
    desc: boolean = true,
  ) => {
    const params: {
      address: string;
      eventName: string;
      blockfrom?: number;
      blockto?: number;
      desc: boolean;
      argFilter?: string;
      recentBlockCnt?: number;
    } = {
      address,
      eventName,
      argFilter,
      desc,
    };
    if (typeof range === 'number') {
      params.recentBlockCnt = range;
    } else if (typeof range === 'object') {
      params.blockfrom = range.blockfrom;
      params.blockto = range.blockto;
    }

    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getPastEvents',
            params: params,
          },
        },
      })) as any;

      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getABI = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getABI',
            params: { address },
          },
        },
      })) as any;

      console.log('getABI', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const queryContractState = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'queryContractState',
            params: { address },
          },
        },
      })) as any;

      console.log('queryContractState', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlockTransactionCount = async (value: string | number) => {
    try {
      const params: { hash?: string; number?: number } = {};
      if (typeof value === 'string') {
        params.hash = value;
      } else if (typeof value === 'number') {
        params.number = value;
      }

      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getBlockTransactionCount',
            params,
          },
        },
      })) as any;

      console.log('getBlockTransactionCount', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getChainInfo = async () => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getChainInfo',
          },
        },
      })) as any;

      console.log('getChainInfo', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getConsensusInfo = async () => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getConsensusInfo',
          },
        },
      })) as any;

      console.log('getConsensusInfo', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getAccountVotes = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getAccountVotes',
            params: { account: address },
          },
        },
      })) as any;

      console.log('getAccountVotes', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getNodeInfo = async (component?: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getNodeInfo',
            params: { component },
          },
        },
      })) as any;

      console.log('getNodeInfo', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getChainId = async (noHidden?: boolean, showSelf?: boolean) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getChainId',
            params: { noHidden, showSelf },
          },
        },
      })) as any;

      console.log('getChainId', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getServerInfo = async (key?: string[]) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getServerInfo',
            params: { key },
          },
        },
      })) as any;

      console.log('getServerInfo', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getStaking = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getStaking',
            params: { account: address },
          },
        },
      })) as any;

      console.log('getStaking', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getVotes = async (count: number) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getVotes',
            params: { count },
          },
        },
      })) as any;

      console.log('getVotes', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const metric = async (type: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'metric',
            params: { type },
          },
        },
      })) as any;

      console.log('metric', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getEnterpriseConfig = async (key?: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getEnterpriseConfig',
            params: { key },
          },
        },
      })) as any;

      console.log('getEnterpriseConfig', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getConfChangeProgress = async (hash: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getConfChangeProgress',
            params: { hash },
          },
        },
      })) as any;

      console.log('getConfChangeProgress', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };
  const chainStat = async () => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'chainStat',
          },
        },
      })) as any;

      console.log('chainStat', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const sendTransaction = async () => {
    dispatch(enableLoadingWithMessage('Getting... SendTransaction'));
    try {
      // enlist-disable-next-line @typescript-eslint/no-shadow
      const info = await getBlockNumber();
      const account = await getState(address);

      const sendTransaction = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'sendTransaction',
            params: {
              from: address,
              to: 'AmNdzAYv3dYKFtPRgfUMGppGwBJS2JvZLRTF9gRruF49vppEepgj',
              amount: '100000000000000000',
              type: 4,
              nonce: account.nonce + 1,
              chainIdHash: info.chainIdHash,
            },
          },
        },
      })) as any;

      console.log('sendTransaction', sendTransaction);

      dispatch(disableLoading());
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
    setNode,
    getNode,
    getState,
    getProof,
    getNameInfo,
    getBalance,
    getBlock,
    getBlockNumber,
    getBlockBody,
    listBlockHeaders,
    getBlockMetadata,
    getTransaction,
    getTransactionReceipt,
    getBlockTransactionReceipts,
    getBlockTX,
    call,
    getPastEvents,
    getABI,
    queryContractState,
    getBlockTransactionCount,
    getChainInfo,
    getConsensusInfo,
    getAccountVotes,
    getNodeInfo,
    getChainId,
    getServerInfo,
    getStaking,
    getVotes,
    metric,
    getEnterpriseConfig,
    getConfChangeProgress,
    chainStat,
  };
};
