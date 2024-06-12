import { ActionFn, DocumentsState } from 'types';
import { DocumentsActionType } from './actionsTypes';
import { documentsSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<DocumentsState, ReturnType<F>>;

const setState: HandlerFn<typeof documentsSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const documentsHandlers = {
  [DocumentsActionType.SetState]: setState,
};
