import { ConnectUsState } from 'types';
import { createReducer } from 'utils';
import { connectUsHandlers } from './handlers';

export const connectUsInitialState: Readonly<ConnectUsState> = {
  isLoading: false,
};

export default createReducer(connectUsInitialState, connectUsHandlers);
