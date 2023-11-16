import { FullListState } from 'types';
import { FullListActionType } from './actionsTypes';

export const fullListSetState = (payload: Partial<FullListState>) => ({
  type: FullListActionType.SetState,
  payload,
});

export const GetFullList = () => ({
  type: FullListActionType.GET_FULL_LIST,
});
