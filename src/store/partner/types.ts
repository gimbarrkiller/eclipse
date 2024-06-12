import { AutoBonusType, ReferralData } from 'types';

export interface PartnerState {
  qualificationsList: QualificationsData[],
  rewardsList: RewardsData[],
  statsList: StatsData,
  referralsList?: ReferralData,
  autoBonusList: AutoBonusType[],
  autoTimeNextUpdate?: string,
}

export interface QualificationsData {
  date: string,
  name: string,
  value: number,
}

export interface RewardsData {
  date: string,
  personal_sales: number,
  referral_sales: number,
  total_sales: number,
}

export interface StatsData { [key: string]: string }

export interface PartnerStatisticData {
  qualifications: QualificationsData[],
  rewards: RewardsData[],
  stats: StatsData,
}
