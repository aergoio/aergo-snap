import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { UIReducer, walletReducer, networkReducer } from '../slices';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['wallet', 'UI']
};

const walletPersistConfig = {
  key: 'wallet',
  storage,
  whitelist: ['forceReconnect', 'tokens']
};

const networkPersistConfig = {
  key: 'networks',
  storage,
  whitelist: ['activeNetwork']
};

const reducers = combineReducers({
  wallet: persistReducer(walletPersistConfig, walletReducer),
  networks: persistReducer(networkPersistConfig, networkReducer),
  // modals: modalReducer,
  UI: UIReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
