import { Account, Token, Transaction } from 'types';
import { createSlice } from '@reduxjs/toolkit';

export type WalletState = {
  connected: boolean;
  isLoading: boolean;
  forceReconnect: boolean;
  address: string;
  accountBalance: string;
  transactions: Transaction[];
  tokens: {
    [chainIdLabel: string]: Token[];
  };
  provider?: any;
};

const initialState: WalletState = {
  connected: false,
  isLoading: false,
  forceReconnect: false,
  address: '',
  accountBalance: '',
  transactions: [],
  tokens: {},
  provider: undefined
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
    setAccountBalance: (state, { payload }) => {
      state.accountBalance = payload;
    },
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
    setToken: (state, { payload: { chainIdLabel, token } }) => {
      if (!state.tokens[chainIdLabel]) {
        state.tokens[chainIdLabel] = [token];
      } else {
        state.tokens[chainIdLabel] = [...state.tokens[chainIdLabel], token];
      }
    },
    setTokens: (state, { payload: { chainIdLabel, tokens } }) => {
      state.tokens[chainIdLabel] = tokens;
    },
    resetWallet: (state) => {
      return {
        ...initialState,
        address: state.address,
        tokens: state.tokens,
        provider: state.provider
        // forceReconnect: true
      };
    }
  }
});

export const {
  setProvider,
  setWalletConnection,
  setForceReconnect,
  setAddress,
  setAccountBalance,
  setTransactions,
  setToken,
  setTokens,
  resetWallet
} = walletSlice.actions;

export default walletSlice.reducer;
