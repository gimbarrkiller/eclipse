import { NewsState } from 'types';
import { NewsActionType } from './actionsTypes';

export const newsSetState = (payload: Partial<NewsState>) => ({
  type: NewsActionType.SetState,
  payload,
});

export const getNewsData = () => ({
  type: NewsActionType.GET_NEWS,
});

export const getNewsItemData = (
  payload: { id?: number },
) => ({
  type: NewsActionType.GET_NEWS_ITEM,
  payload,
});
