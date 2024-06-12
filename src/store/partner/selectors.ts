import { ReduxState, PartnerState } from 'types';

export const partnerSelectors = {
  getProp: <T extends keyof PartnerState>(propKey: T) => (
    state: ReduxState,
  ) => state.partner[propKey],
  getState: (state: ReduxState) => state.partner,
};
