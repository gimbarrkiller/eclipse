import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';

import reducer from './rootReducer';
import rootSaga from './rootSaga';
import { AuthState } from './auth/types';
import { ProfileState } from './profile/types';
import { TransactionsState } from './transactions/types';

const sagaMiddleware = createSagaMiddleware();

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: [
    'accessToken',
    'country',
  ] as Array<keyof AuthState>,
};

const transactionsPersistConfig = {
  key: 'transactions',
  storage,
  whitelist: [
    'transactionsList',
    'rate',
  ] as Array<keyof TransactionsState>,
};

const profilePersistConfig = {
  key: 'profile',
  storage,
  whitelist: [
    'avatar',
    'lastName',
    'firstName',
    'fatherName',
    'email',
    'phone',
    'telegram',
    'balance',
    'id',
    'isLicense',
    'referralCode',
    'rank',
  ] as Array<keyof ProfileState>,
};

const reducers = {
  ...reducer,
  auth: persistReducer(authPersistConfig, reducer.auth),
  profile: persistReducer(profilePersistConfig, reducer.profile),
  transactions: persistReducer(transactionsPersistConfig, reducer.transactions),
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

export default (initialState: { [key: string]: never } = {}) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || window.__REDUX_DEVTOOLS_EXTENSION__
    || compose;

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};
