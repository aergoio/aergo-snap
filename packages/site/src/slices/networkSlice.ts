import { createSlice } from '@reduxjs/toolkit';
import { Network } from 'types';
import { Networks } from 'utils/constants';

export interface NetworkState {
  items: Network[];
  activeNetwork: number;
  chainIdLabel: string;
  network: Network;
}

const initialState: NetworkState = {
  items: [],
  activeNetwork: 0,
  chainIdLabel: `${Networks[0].chainId}/${Networks[0].label}`,
  network: { ...Networks[0] },
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworks: (state, action) => {
      state.items = action.payload;
    },
    setActiveNetwork: (state, action) => {
      state.activeNetwork = action.payload;
      state.chainIdLabel = `${state.items[action.payload].chainId}/${
        state.items[action.payload].label
      }`;
      state.network = state.items[action.payload];
    },
    resetNetwork: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setNetworks, setActiveNetwork, resetNetwork } =
  networkSlice.actions;

export default networkSlice.reducer;
