import { Action as ActionRedux } from 'redux';

/**
 * ActionFn is a Fn for createReducer helper
 */
export type ActionFn<T, U> = (
  state: Readonly<T>,
  action: ActionRedux<string> & U
) => Readonly<T>;

export * from 'store/connectUs/types';
export * from 'store/profile/types';
export * from 'store/partner/types';
export * from 'store/transactions/types';
export * from 'store/ticket/types';
export * from 'store/status/types';
export * from 'store/pool/types';
export * from 'store/auth/types';
export * from 'store/news/types';
export * from 'store/types';
export * from 'store/documents/types';
