import { NewsState } from 'types';
import { createReducer } from 'utils';

import { newsHandlers } from './handlers';

export const newsInitialState: Readonly<NewsState> = {
  news: [],
  newsItem: undefined,
  isLoading: false,
};

export default createReducer(newsInitialState, newsHandlers);
