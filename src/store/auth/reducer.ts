import { AuthState } from 'types';
import { createReducer } from 'utils';

import { authHandlers } from './handlers';

export const authInitialState: Readonly<AuthState> = {
  isLoading: false,
  email: '',
  accessToken: undefined,
  country: [{ value: '', label: '' }],
};

export default createReducer(authInitialState, authHandlers);
