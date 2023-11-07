import { createSlice } from '@reduxjs/toolkit';

export type UIState = {
  loader: {
    isLoading: boolean;
    loadingMessage: string;
  };
  error: any;
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
  },
});

export const { enableLoadingWithMessage, disableLoading, setError } =
  UISlice.actions;

export default UISlice.reducer;
