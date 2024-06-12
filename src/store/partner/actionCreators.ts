import { PartnerState } from 'types';
import { PartnerActionType } from './actionsTypes';

export const partnerSetState = (payload: Partial<PartnerState>) => ({
  type: PartnerActionType.SetState,
  payload,
});

export const getPartnerStatisticData = (
  payload: { period: string },
) => ({
  type: PartnerActionType.GET_STATISTIC,
  payload,
});

export const getPartnerReferralsData = (
  payload: {
    period?: string,
    id?: string,
  },
) => ({
  type: PartnerActionType.GET_REFERRAL_LIST,
  payload,
});

export const getPartnerAutoBonusData = () => ({
  type: PartnerActionType.GET_AUTO_BONUS,
});
