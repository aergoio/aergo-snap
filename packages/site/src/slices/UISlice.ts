import { createSlice } from '@reduxjs/toolkit';

export type UIState = {
  loader: {
    isLoading: boolean;
    loadingMessage: string;
  };
  error: any;
  sidebar: number;
  tokenType: 'ARC1' | 'ARC2';
};

const initialState: UIState = {
  loader: {
    isLoading: false,
    loadingMessage: '',
  },
  error: {
    code: 0,
    message: '',
    data: {},
  },
  sidebar: 0,
  tokenType: 'ARC1',
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
    setSidebar: (state, { payload }) => {
      state.sidebar = payload;
    },
    setTokenType: (state, { payload }) => {
      state.tokenType = payload;
    },
  },
});

export const {
  enableLoadingWithMessage,
  disableLoading,
  setError,
  setSidebar,
  setTokenType,
} = UISlice.actions;

export default UISlice.reducer;
