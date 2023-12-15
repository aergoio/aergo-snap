/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { GetKeysResponse, Network, NodeResponse } from 'types';
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
  const { provider, address, tokens } = useAppSelector((state) => state.wallet);
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

      console.log('address', address);
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

  const setNode = async (node: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: { snapId, request: { method: 'setNode', params: { node } } }
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
        params: { snapId, request: { method: 'getNode' } }
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
          request: { method: 'getState', params: { account: address } }
        }
      })) as any;

      console.log('getState', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getStateAndProof = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getStateAndProof', params: { account: address } }
        }
      })) as any;

      console.log('getStateAndProof', data);
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
          request: { method: 'getNameInfo', params: { name, number } }
        }
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
          request: { method: 'getBalance', params: { account: address } }
        }
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
          request: { method: 'getBlock', params }
        }
      })) as any;

      console.log('getBlock', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const blockchain = async () => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'blockchain' }
        }
      })) as any;

      console.log('blockchain', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlockBody = async (
    value: string | number,
    offset: number = 0,
    size: number = 10
  ) => {
    const params: {
      hash?: string;
      number?: number;
      offset: number;
      size: number;
    } = {
      offset,
      size
    };

    if (typeof value === 'string') params.hash = value;
    if (typeof value === 'number') params.number = value;

    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: { method: 'getBlockBody', params }
        }
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
    asc: boolean = true
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
              asc
            }
          }
        }
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
            params
          }
        }
      })) as any;

      console.log('getBlockMetadata', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getTx = async (hash: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getTx',
            params: { hash }
          }
        }
      })) as any;

      console.log('getTx', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getReceipt = async (hash: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getReceipt',
            params: { hash }
          }
        }
      })) as any;

      console.log('getReceipt', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getReceipts = async (value: string | number) => {
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
            method: 'getReceipts',
            params
          }
        }
      })) as any;

      console.log('getReceipts', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getBlockTx = async (hash: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getBlockTx',
            params: { hash }
          }
        }
      })) as any;

      console.log('getBlockTx', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const queryContract = async (
    address: string,
    name: string,
    query: string[] = []
  ) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'queryContract',
            params: { address, name, query }
          }
        }
      })) as any;

      console.log('queryContract', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const listEvents = async (
    address: string,
    eventName: string,
    argFilter: string,
    range: number | { blockfrom?: number; blockto?: number },
    desc: boolean = true
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
      desc
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
            method: 'listEvents',
            params: params
          }
        }
      })) as any;

      console.log('listEvents', data);

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
            params: { address }
          }
        }
      })) as any;

      console.log('getABI', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const queryContractStateProof = async (address: string) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'queryContractStateProof',
            params: { address }
          }
        }
      })) as any;

      console.log('queryContractStateProof', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getTxCount = async (value: string | number) => {
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
            method: 'getTxCount',
            params
          }
        }
      })) as any;

      console.log('getTxCount', data);
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
            method: 'getChainInfo'
          }
        }
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
            method: 'getConsensusInfo'
          }
        }
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
            params: { account: address }
          }
        }
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
            params: { component }
          }
        }
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
            params: { noHidden, showSelf }
          }
        }
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
            params: { key }
          }
        }
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
            params: { account: address }
          }
        }
      })) as any;

      console.log('getStaking', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const getVotes = async (id?: string, count?: number) => {
    try {
      const data = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'getVotes',
            params: { id, count }
          }
        }
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
            params: { type }
          }
        }
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
            params: { key }
          }
        }
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
            params: { hash }
          }
        }
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
            method: 'chainStat'
          }
        }
      })) as any;

      console.log('chainStat', data);
      return data;
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
    }
  };

  const sendTransaction = async (params: {
    from: string;
    to: string;
    amount: string;
    type: number;
    nonce?: number;
    chainIdHash?: string;
    payloadJson?: {
      name: string;
      args?: any[];
    };
  }) => {
    dispatch(enableLoadingWithMessage('Getting... SendTransaction'));
    try {
      if (!params.nonce) {
        const account = await getState(address);
        params.nonce = account.nonce + 1;
      }

      if (!params.chainIdHash) {
        const info = await blockchain();
        params.chainIdHash = info.chainIdHash;
      }

      const sendTransaction = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'sendTransaction',
            params
          }
        }
      })) as any;

      console.log('sendTransaction', sendTransaction);

      dispatch(disableLoading());
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
      dispatch(disableLoading());
    }
  };

  const sendAergo = async (to: string, amount: string) => {
    dispatch(enableLoadingWithMessage('Getting... sendAergo'));
    try {
      const info = await blockchain();
      const account = await getState(address);

      const sendAergo = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'sendTransaction',
            params: {
              from: address,
              to,
              amount,
              type: 4,
              nonce: account.nonce + 1,
              chainIdHash: info.chainIdHash
            }
          }
        }
      })) as any;

      console.log('sendAergo', sendAergo);

      dispatch(disableLoading());
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
      dispatch(disableLoading());
    }
  };

  const sendVote = async (payload: any) => {
    dispatch(enableLoadingWithMessage('Getting... sendVote'));
    try {
      const sendVote = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'sendVote',
            params: {
              from: address,
              payloadJson: payload
            }
          }
        }
      })) as any;

      console.log('sendVote', sendVote);

      dispatch(disableLoading());
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
      dispatch(disableLoading());
    }
  };

  const sendStake = async (amount: string) => {
    dispatch(enableLoadingWithMessage('Getting... sendStake'));
    try {
      const sendStake = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'sendStake',
            params: {
              from: address,
              amount
            }
          }
        }
      })) as any;

      console.log('sendStake', sendStake);

      dispatch(disableLoading());
    } catch (err) {
      console.error(err);
      dispatch(setError(err));
      dispatch(disableLoading());
    }
  };

  const sendUnStake = async (amount: string) => {
    dispatch(enableLoadingWithMessage('Getting... sendUnStake'));
    try {
      const sendUnStake = (await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'sendUnStake',
            params: {
              from: address,
              amount
            }
          }
        }
      })) as any;

      console.log('sendUnStake', sendUnStake);

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
    getStateAndProof,
    getNameInfo,
    getBalance,
    getBlock,
    blockchain,
    getBlockBody,
    listBlockHeaders,
    getBlockMetadata,
    getTx,
    getReceipt,
    getReceipts,
    getBlockTx,
    queryContract,
    listEvents,
    getABI,
    queryContractStateProof,
    getTxCount,
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
    sendAergo,
    sendVote,
    sendStake,
    sendUnStake
  };
};
