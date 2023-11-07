import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import thunk from 'redux-thunk';
import { UIReducer, walletReducer } from '../slices';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local');

const persistConfig = {
  key: 'root',
  storage,
  //   blacklist: ['wallet', 'modals', 'networks'],
};

const walletPersistConfig = {
  key: 'wallet',
  storage,
  whitelist: ['forceReconnect'],
};

// const networkPersistConfig = {
//   key: 'networks',
//   storage,
//   whitelist: ['activeNetwork'],
// };

const reducers = combineReducers({
  wallet: persistReducer(walletPersistConfig, walletReducer),
  //   networks: persistReducer(networkPersistConfig, networkReducer),
  // modals: modalReducer,
  UI: UIReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
