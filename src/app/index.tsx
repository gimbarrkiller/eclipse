import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'i18n';
import configureStore from 'store/configureStore';

import { Routes } from 'containers';
import { ToastPortal } from 'components';
import { ModalProvider } from 'context';
import { PersistGate } from 'redux-persist/integration/react';

const config = configureStore();
export const { store, persistor } = config;

export const App = () => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <ModalProvider>
        <ToastPortal />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ModalProvider>
    </PersistGate>
  </Provider>
);
