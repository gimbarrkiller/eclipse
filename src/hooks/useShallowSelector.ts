import { ReduxState } from 'types';

import { shallowEqual, useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useShallowSelector = <T extends (state: ReduxState) => any>(selector: T):
ReturnType<T> => useSelector(selector, shallowEqual);
