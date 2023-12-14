import { createSlice } from '@reduxjs/toolkit';
import { Token } from 'types';

export type UIState = {
  loader: {
    isLoading: boolean;
    loadingMessage: string;
  };
  error: any;
  tokenType: 'ARC1' | 'ARC2';
  selectedToken: string | Token;
};

const initialState: UIState = {
  loader: {
    isLoading: false,
    loadingMessage: ''
  },
  error: {
    code: 0,
    message: '',
    data: {}
  },
  tokenType: 'ARC1',
  selectedToken: 'AERGO'
};

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    enableLoadingWithMessage: (state, action) => {
      state.loader.isLoading = true;
      state.loader.loadingMessage = action.payload;
    },
    disableLoading: (state) => {
      state.loader.isLoading = false;
      state.loader.loadingMessage = '';
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setTokenType: (state, { payload }) => {
      state.tokenType = payload;
    },
    setSelectedToken: (state, { payload }) => {
      state.selectedToken = payload;
    }
  }
});

export const {
  enableLoadingWithMessage,
  disableLoading,
  setError,
  setTokenType,
  setSelectedToken
} = UISlice.actions;

export default UISlice.reducer;
