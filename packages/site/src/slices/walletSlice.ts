import { createSlice } from '@reduxjs/toolkit';

export type WalletState = {
  connected: boolean;
  isLoading: boolean;
  forceReconnect: boolean;
  address: string;
  provider?: any;
};

const initialState: WalletState = {
  connected: false,
  isLoading: false,
  forceReconnect: false,
  address: '',
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
  resetWallet,
} = walletSlice.actions;

export default walletSlice.reducer;
