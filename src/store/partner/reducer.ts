import { PartnerState } from 'types';
import { createReducer } from 'utils';

import { partnerHandlers } from './handlers';

export const partnerInitialState: Readonly<PartnerState> = {
  qualificationsList: [],
  rewardsList: [],
  statsList: {},
  referralsList: undefined,
  autoBonusList: [],
  autoTimeNextUpdate: undefined,
};

export default createReducer(partnerInitialState, partnerHandlers);
