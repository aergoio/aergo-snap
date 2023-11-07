import { GatsbyBrowser } from 'gatsby';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './src/store';
import { App } from './src/App';
import { Root } from './src/Root';

const persistor = persistStore(store);

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <StrictMode>
    <Root>{element}</Root>
  </StrictMode>
);

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App>{element}</App>
    </PersistGate>
  </Provider>
);
