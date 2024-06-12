import { DocumentsState } from 'types';
import { DocumentsActionType } from './actionsTypes';

export const documentsSetState = (payload: Partial<DocumentsState>) => ({
  type: DocumentsActionType.SetState,
  payload,
});

export const getDocumentsData = () => ({
  type: DocumentsActionType.GET_DOCS,
});

export const getDocumentsItemData = (
  payload: { id?: number },
) => ({
  type: DocumentsActionType.GET_DOCS_ITEM,
  payload,
});
