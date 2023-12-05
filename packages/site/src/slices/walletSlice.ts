import { Account, Token, Transaction } from 'types';
import { createSlice } from '@reduxjs/toolkit';

export type WalletState = {
  connected: boolean;
  isLoading: boolean;
  forceReconnect: boolean;
  address: string;
  account: Account | null;
  transactions: Transaction[];
  tokens: Token[];
  provider?: any;
};

const initialState: WalletState = {
  connected: false,
  isLoading: false,
  forceReconnect: false,
  address: '',
  account: null,
  transactions: [],
  tokens: [{ name: 'AERGO', amount: '0', hash: '' }],
  provider: undefined,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setProvider: (state, { payload }) => {
      state.provider = payload;
    },
    setWalletConnection: (state, { payload }) => {
      state.connected = payload;
    },
    setForceReconnect: (state, { payload }) => {
      state.forceReconnect = payload;
    },
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    setAccount: (state, { payload }) => {
      state.account = payload;
    },
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
    setTokens: (state, { payload }) => {
      state.tokens = payload;
    },
    resetWallet: () => {
      return {
        ...initialState,
        forceReconnect: true,
      };
    },
  },
});

export const {
  setProvider,
  setWalletConnection,
  setForceReconnect,
  setAddress,
  setAccount,
  setTransactions,
  setTokens,
  resetWallet,
} = walletSlice.actions;

export default walletSlice.reducer;
